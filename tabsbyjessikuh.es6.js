/**
 * Created by Jessica Stamos (https://jessicastamos.com)
 * Refer to the repo for updates/additional information
 * https://gitlab.com/jnstamos/vanilla-js-multiple-customtabs
 * Contact: jessica@jessicastamos.com
 */

const customtabsAdv = (() => {
  // Global functions
  const makeArray = (element) => { return Array.prototype.slice.call(element); };
  const hasClass = (element, className) => { return (` ${element.className} `).indexOf(` ${className} `) > -1; };

  // Equal Height begins
  const equalHeight = () => {
    let equalHeightContainer,
        equalHeightChildren,
        allHeights,
        maxHeight;

    equalHeightContainer = document.querySelectorAll('[data-equal-height="true"]');
    for(let i = 0; i < equalHeightContainer.length; i++) {
      allHeights = [];
      maxHeight = -1;
      equalHeightChildren = makeArray(equalHeightContainer[i].children);

      equalHeightChildren.forEach(child => { allHeights.push(child.offsetHeight); });
      maxHeight = Math.max(...allHeights);

      equalHeightChildren.forEach(child => { child.style.height = `${maxHeight}px`; });
    }
  };
  equalHeight();

  // customtabs function
  const getAnimation = element => {
    let animation = element.getAttribute('data-customtabs-animation');
    return animation ? ` ${animation}` : '';
  };

  const getcustomtabs = (li) => {
    const customtabsContainer = li.parentNode,
          customtabsParent = customtabsContainer.parentNode,
          contentContainer = customtabsParent.querySelector('.customtabs__container'),
          customtabs = makeArray(customtabsContainer.children),
          customtabsContent = makeArray(contentContainer.children),
          customtabsIndex = customtabs.indexOf(li),
          active = makeArray(customtabsParent.querySelectorAll('.is-active')),
          animation = getAnimation(customtabsParent),
          remember = customtabsParent.getAttribute('data-remember-customtab');

    if(!hasClass(li, 'is-active')) {
      active.forEach(customtab => {
        customtab.className = customtab.className.replace('is-active', '');
        customtab.className = customtab.className.replace(animation, '');
      });

      li.className += ' is-active';
      customtabsContent[customtabsIndex].className += ` is-active${animation}`;
    }

    if(remember) {
      assignRemembercustomtab(remember, customtabsIndex);
    }
  };

  const customtabsArray = makeArray(document.querySelectorAll('ul.customtabs__list > li'));
  customtabsArray.forEach(li => { li.addEventListener('click', () => { getcustomtabs(li); }, false); });

  // Remember customtabs
  const assignRemembercustomtab = (remember, index) => localStorage.setItem(`lastcustomtab-${remember}`, index);

  const applyRemembercustomtab = () => {
    let customtabsContainers = makeArray(document.querySelectorAll('.customtabs'));
    customtabsContainers.forEach(el => {
      if(el.getAttribute('data-remember-customtab')) {
        const customtabsList = el.querySelector('ul'),
              customtabs = makeArray(customtabsList.children),
              customtabsContent = makeArray(el.querySelector('.customtabs__container').children),
              index = getRememberedcustomtabIndex(el.getAttribute('data-remember-customtab')),
              active = makeArray(el.querySelectorAll('.is-active'));

        active.map(activecustomtab => { activecustomtab.className = activecustomtab.className.replace('is-active', ''); });

        customtabs[index].className += ' is-active';
        customtabsContent[index].className += ' is-active';
      }
    });
  };

  const getRememberedcustomtabIndex = attribute => {
    const index = localStorage.getItem(`lastcustomtab-${attribute}`);
    return index ? index : 0;
  };

  applyRemembercustomtab();
})();
