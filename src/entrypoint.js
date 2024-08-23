import intersect from '@alpinejs/intersect';
import resize from '@alpinejs/resize';
import GraphemeSplitter from 'grapheme-splitter';
import { debounce } from 'throttle-debounce';

/**
 * Append the child element and wait for the parent's
 * dimensions to be recalculated
 * See https://stackoverflow.com/a/66172042/11784757
 */
const appendChildAwaitLayout = (parent, element) => {
  return new Promise((resolve, _) => {
    const resizeObserver = new ResizeObserver((entries, observer) => {
      observer.disconnect()
      resolve(entries)
    })
    resizeObserver.observe(element)
    parent.appendChild(element)
  })
}

export default (Alpine) => {
  Alpine.plugin(intersect);
  Alpine.plugin(resize);
  document.addEventListener('alpine:init', () => {
    Alpine.store("headerHeight", 0);

    Alpine.data('Stagger', (delay, classes) => ({
      delay,
      init() {
        setTimeout(() => {
          if (Array.isArray(classes)){
            classes.every((className) => {
              this.$el.classList.toggle(className);
              return true;
            })
          } else {
            this.$el.classList.toggle(classes);
          }
        }, delay);
      }
    }));

    Alpine.data('Typewriter',({ autostart, multiline, repeatCycle, text, textArray, textIndex, charIndex, typingSpeed, deleteSpeed, pauseStart, pauseEnd, cursorSpeed }) => ({
      initialText: text,
      splitter: null,
      textArray,
      textIndex,
      charIndex,
      typingSpeed,
      deleteSpeed,
      pauseStart,
      pauseEnd,
      cursorSpeed,
      multiline,
      autostart,
      direction: 'forward',
      typingInterval: false,
      repeatCycle,
      repeatCount: 0,
      startTyping() {
        const typer = () => {
          const current = this.textArray[this.textIndex];
          const characterArray = this.splitter.splitGraphemes(current);
          
          console.log('debug', this.textIndex, this.charIndex);
          if (this.charIndex > characterArray.length) {
            console.log(68)
            clearInterval(this.typingInterval);
            if ((this.textArray.length - this.textIndex) === 1 && this.repeatCount <= this.repeatCycle && this.multiline === false) {
              console.log(71)
            } else {
              console.log(73)
              if (this.multiline) {
                console.log(75)
                if (this.charIndex > characterArray.length) {
                  if ((this.textArray.length - this.textIndex) === 1) {
                  } else {
                    setTimeout(() => {
                      console.log(89)
                      this.textIndex += 1;
                      this.charIndex = 1;
                      this.typingInterval = setInterval(typer, this.typingSpeed);
                    }, this.pauseEnd);
                  }
                }
              } else {
                console.log(82)
                this.direction = 'backward';
                setTimeout(() => {
                  this.typingInterval = setInterval(typer, this.deleteSpeed);
                }, this.pauseEnd);
              }
            }
          }

          if (this.charIndex > 0) {
            if (this.multiline)  {
              console.log(93)
              let allArrays = this.textArray.filter((array, key) => (key <= this.textIndex))
              allArrays[this.textIndex] = allArrays[this.textIndex].slice(0, this.charIndex);
              console.log(this.textIndex, this.charIndex);

              this.$el.innerHTML = allArrays.join("<br />")
            } else {
              this.$el.innerText = characterArray.slice(0, this.charIndex).join("")
            }
          } else {
            this.$el.innerText = "";
          }

          if (this.direction === 'forward'){
            console.log(106)
            this.charIndex += 1;
          } else {
            if (this.charIndex == 0) {
              console.log(109)
              this.direction = 'forward';
              this.repeatCount++;
              clearInterval(this.typingInterval);
              setTimeout(() => {
                this.textIndex += 1;
                if (this.textIndex >= this.textArray.length && this.multiline === false){
                  this.textIndex = 0;
                }
                this.typingInterval = setInterval(typer, this.typingSpeed);
              }, this.typingSpeed);
            }
            this.charIndex -= 1;
          }
        }
                
        setTimeout(() => {
          this.typingInterval = setInterval(typer, this.typingSpeed);
        }, this.pauseStart)
      },
      init() {
        this.splitter = new GraphemeSplitter();

        if (this.autostart) {
          this.$dispatch('startTyping')
        }

        setTimeout(() => {

          this.$dispatch('startTyping')
        }, 2000)
      },
      destroy() {
        clearInterval(this.typingInterval);
      },
      textContainer: {
        ['@start-typing.camel.self']() {
          this.startTyping();
        }
      }
    }))

    Alpine.data('Marquee', ({ speed = 1, spaceX = 0, dynamicWidthElements = false, mode = 'autoplay', pauseWhileHover = true }) => ({
      dynamicWidthElements,
      debouncedResize: null,
      setWidth() {
        const originalWidth = this.$el.scrollWidth + spaceX * 4
        // Required for the marquee scroll animation 
        // to loop smoothly without jumping 
        this.$el.style.setProperty('--marquee-width', originalWidth + 'px')
        this.$el.style.setProperty(
          '--marquee-time',
          ((1 / speed) * originalWidth) / 100 + 's'
        )
      },
      container: {
        [':class']() {
          return {
            'marquee--autoplay': mode === 'autoplay',
            'marquee--autopause': pauseWhileHover && mode === 'autoplay',
          }
        }
      },
      async init() {
        if (this.dynamicWidthElements) {
          const images = this.$el.querySelectorAll('img')
          // If there are any images, make sure they are loaded before
          // we start cloning them, since their width might be dynamically
          // calculated
          if (images) {
            await Promise.all(
              Array.from(images).map(image => {
                return new Promise((resolve, _) => {
                  if (image.complete) {
                    resolve()
                  } else {
                    image.addEventListener('load', () => {
                      resolve()
                    })
                  }
                })
              })
            )
          }
        }

        // Store the original element so we can restore it on screen resize later
        this.originalElement = this.$el.cloneNode(true)

        this.setWidth();
        this.resize();
        this.debouncedResize = debounce(100, this.resize.bind(this));
        // Make sure the resize function can only be called once every 100ms
        // Not strictly necessary but stops lag when resizing window a bit
        window.addEventListener('resize', this.debouncedResize)
      },
      destroy() {
        window.removeEventListener('resize', this.debouncedResize)
      },
      async resize() {
        // Reset to original number of elements
        this.$el.innerHTML = this.originalElement.innerHTML
  
        // Keep cloning elements until marquee starts to overflow
        let i = 0

        const computedStyles = window.getComputedStyle(this.$el);

        if (computedStyles.display !== 'none') {
          while (this.$el.scrollWidth <= this.$el.clientWidth) {
            if (this.dynamicWidthElements) {
              // If we don't give this.$el time to recalculate its dimensions
              // when adding child nodes, the scrollWidth and clientWidth won't
              // change, thus resulting in this while loop looping forever
              await appendChildAwaitLayout(
                this.$el,
                this.originalElement.children[i].cloneNode(true)
              )
            } else {
              this.$el.appendChild(
                this.originalElement.children[i].cloneNode(true)
              )
            }
            i += 1
            i = i % this.originalElement.childElementCount
            
            // Add another (original element count) of clones so the animation
            // has enough elements off-screen to scroll into view
            let j = 0
            while (j < this.originalElement.childElementCount) {
              this.$el.appendChild(this.originalElement.children[i].cloneNode(true))
              j += 1
              i += 1
              i = i % this.originalElement.childElementCount
            }
          }
        }

        if(computedStyles.getPropertyValue('--marquee-width') === '0px') {
          this.setWidth();
        }
      },
    }));
  })


}