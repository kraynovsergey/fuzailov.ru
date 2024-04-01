import Swiper from 'swiper';
import { Navigation } from "swiper/modules";
import { Autoplay } from 'swiper/modules';

import { Fancybox } from "@fancyapps/ui";

import gsap from "gsap";

import rangeSlider from 'range-slider-input';

import Choices from "choices.js";

import stickySidebar from 'sticky-sidebar';

import Lenis from '@studio-freight/lenis';

import '../../node_modules/tooltip-plugin/dist/tooltip.min.js';

import Accordion from 'accordion-js';

/* Fancybox */
Fancybox.bind("[data-fancybox]", {});

/* Fancybox без закрытия свайпом */
Fancybox.bind("[data-fancybox-no-swipe]", {
    dragToClose: false
});

/* Плавный скролл */
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
  
requestAnimationFrame(raf);

/* Стандартный набор */
import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();
flsFunctions.phone_mask();
flsFunctions.privacy_policy();
flsFunctions.tabs();
flsFunctions.product_count();

/* Смена образа */
/*const swiper_fashion = document.querySelectorAll('[data-swiper-fashion]');

if (swiper_fashion.length > 0) {
    swiper_fashion.forEach(item => {
        let i = item.getAttribute('data-swiper-fashion');

        let swiper_fashion_init = new Swiper(item, {
            slidesPerView: 1,
            allowTouchMove: false,
            speed: 1000
        });

        let swiper_fashion_product = document.querySelectorAll('[data-swiper-fashion-swiper="' + i + '"]');

        if (swiper_fashion_product.length > 0) {
            swiper_fashion_product.forEach((row) => {
                row.addEventListener('mouseenter', () => {
                    swiper_fashion_init.slideTo(row.getAttribute('data-swiper-fashion-slide'));
                });
            });
        }
    });
}*/

/* Затемнение категорий и перемещение изображения */
const categories_item = document.querySelectorAll('[data-categories-item]');
if (categories_item.length > 0) {
    categories_item.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            categories_item.forEach((row) => {
                let target = row.querySelector('[data-categories-item-target]');
                target.classList.add('_opacity');
            });

            let target = item.querySelector('[data-categories-item-target]');
            target.classList.remove('_opacity');
        });

        item.addEventListener('mouseleave', () => {
            categories_item.forEach((row) => {
                let target = row.querySelector('[data-categories-item-target]');
                target.classList.remove('_opacity');
            });
        });

        let picture = item.querySelector('[data-categories-item-picture]');
        if (picture) {
            let posX = 0,
                mouseX = 0;

            item.addEventListener('mousemove', (e) => {
                mouseX = e.clientX - item.offsetLeft;
            });

            setInterval(function () {
                posX += (mouseX - posX) / 9;
                gsap.set(picture, {
                    css: {
                        left: posX
                    }
                });
            }, 15);
        }
    });
}

/* Эффект параллакса при скроле */
const picture_parallax = document.querySelectorAll('[data-picture-parallax]');
if (picture_parallax.length > 0) {
    picture_parallax.forEach(item => {
        let moveCoef = item.getAttribute('data-picture-parallax');

        window.addEventListener("scroll", picture_parallax_func);
        window.addEventListener("resize", picture_parallax_func);

        picture_parallax_func();

        function picture_parallax_func() {
            let r = item.getBoundingClientRect();
            let paralaxYCenter = r.y + r.height / 2;
            let scrollYCenter = window.innerHeight / 2;
            let move = (paralaxYCenter - scrollYCenter) * moveCoef - 100;

            if (item.hasAttribute('data-picture-rotate-right')) {
                item.style.transform = 'translateY(' + move + 'px) rotate(' + (move / 8 * -1) + 'deg)';
            } else {
                if (item.hasAttribute('data-picture-rotate-left')) {
                    item.style.transform = 'translateY(' + move + 'px) rotate(' + (move / 8) + 'deg)';
                } else {
                    item.style.transform = 'translateY(' + move + 'px)';
                }
            }
        }
    });
}

/* Карта */
const map = document.querySelector('#map');
if (map) {
    const map_center = set_map_center();

    window.addEventListener('resize', () => {
        const map_center = set_map_center();
    });

    function set_map_center() {
        if (document.documentElement.clientWidth < 768)
            return [55.75466678243443, 37.55660058359817];
        else
            return [55.75459417750839, 37.54469157557203];
    }

    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map", {
            center: map_center,
            zoom: 15
        });

        let myGeoObject = new ymaps.Placemark([55.754203068972714, 37.556388], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-marker@2x.png',
            iconImageSize: [161, 107],
            iconImageOffset: [-81, -107]
        });

        myMap.geoObjects.add(myGeoObject);

        myMap.behaviors.disable('scrollZoom');
        myMap.controls.remove('default');
    }
}

/* Обычный слайдер с навигацей */
const default_swiper = document.querySelectorAll('[data-default-swiper]');
if (default_swiper.length > 0) {
    default_swiper.forEach(item => {
        new Swiper(item, {
            modules: [Navigation],
            slidesPerView: 1,
            speed: 1000,
            navigation: {
                prevEl: item.querySelector('[data-swiper-prev]'),
                nextEl: item.querySelector('[data-swiper-next]')
            }
        });
    });
}

/* Одновременное закрытие модального окна и открытие другого */
const fancybox_double = document.querySelectorAll('[data-fancybox-double]');
if (fancybox_double.length > 0) {
    fancybox_double.forEach(item => {
        item.addEventListener('click', () => {
            Fancybox.close();
            Fancybox.show(
                [
                    {
                        src: item.getAttribute('data-fancybox-double'),
                        type: "inline"
                    }
                ]
            )
        });
    });
}

/* Поиск */
const search_show = document.querySelector('[data-search-show]'),
    search = document.querySelector('[data-search]'),
    search_hide = document.querySelector('[data-search-hide]');
if (search_show) {
    const search_animation = gsap.to(search, {
        display: 'flex',
        opacity: 1
    }).pause();

    search_show.addEventListener('click', () => {
        search_show.classList.toggle('_active');
        if (search_show.classList.contains('_active')) search_animation.play();
        else search_animation.reverse();
    });

    if (search_hide) {
        search_hide.addEventListener('click', () => {
            search_show.classList.remove('_active');
            search_animation.reverse();
        });
    }

    document.addEventListener('click', (e) => {
        if (!search_show.contains(e.target) && !search.contains(e.target) && search_show.classList.contains('_active')) {
            search_animation.reverse();
            search_show.classList.remove('_active');
        }
    })
}

/* Шапка */
const header = document.querySelector('[data-header]');
if (header) {
    window.addEventListener('scroll', () => {
        if (scrollY > 40) header.classList.add('_scroll');
            else header.classList.remove('_scroll');
    });
}

/* Выпадающее меню */
const nav_parent = document.querySelectorAll('[data-nav-parent]');
if (nav_parent.length > 0) {
    nav_parent.forEach(item => {
        let target = item.querySelector('[data-nav-parent-target]'),
            nav_animation = gsap.to(target, {
                display: 'grid',
                opacity: 1
            }).pause();

        get_window_width();

        window.addEventListener('resize', () => {
            get_window_width();
        });

        function get_window_width() {
            if (document.documentElement.offsetWidth > 991) {
                item.addEventListener('mouseenter', () => {
                    nav_animation.play();
                });

                item.addEventListener('mouseleave', () => {
                    nav_animation.reverse();
                });
            } else {
                item.addEventListener('click', () => {
                    item.classList.toggle('_active');
                    if (item.classList.contains('_active')) nav_animation.play();
                    else nav_animation.reverse();
                });
            }
        }
    });
}

/* "Еще" в фильтре */
const filter_more = document.querySelectorAll('[data-filter-more]');
if (filter_more.length > 0) {
    filter_more.forEach(item => {
        item.addEventListener('click', () => {
            let parent_el = item.closest('[data-filter-more-parent]');
            if (parent_el) {
                parent_el.classList.toggle('_show');

                let s_default = item.querySelector('span._default'),
                    s_hover = item.querySelector('span._hover'),
                    s_text = item.getAttribute('data-filter-more-default');
                
                if (parent_el.classList.contains('_show')) {
                    s_default.innerHTML = 'Свернуть';
                    s_hover.innerHTML = 'Свернуть';
                } else {
                    s_default.innerHTML = s_text;
                    s_hover.innerHTML = s_text;
                }


                /*let hidden_el = parent_el.querySelectorAll('._hidden');
                if (hidden_el.length > 0) {
                    hidden_el.forEach(he => {
                        gsap.to(he, {
                            display: 'flex',
                            opacity: 1
                        })
                        item.classList.add('_hidden');
                    });
                }*/
            }
        });
    });
}

/* Выбор диапазона */
const range = document.querySelectorAll('[data-range]');
if (range.length > 0) {
    range.forEach(item => {
        let range_from = item.closest('[data-range-wrap]').querySelector('[data-range-from]'),
            range_to = item.closest('[data-range-wrap]').querySelector('[data-range-to]'),
            range_from_input = item.closest('[data-range-wrap]').querySelector('[data-range-input-from]'),
            range_to_input = item.closest('[data-range-wrap]').querySelector('[data-range-input-to]'),
            rangeSliderElement = rangeSlider(item, {
                min: item.getAttribute('data-range-min'),
                max: item.getAttribute('data-range-max'),
                step: item.getAttribute('data-range-step'),
                value: [+item.getAttribute('data-range-min-value'), +item.getAttribute('data-range-max-value')],
                onInput: function (value, userInteraction) {
                    if (range_from) range_from.innerHTML = value[0];
                    if (range_to) range_to.innerHTML = value[1];
                    if (range_from_input) range_from_input.value = value[0];
                    if (range_to_input) range_to_input.value = value[1];
                }
            });
    });
}

/* Удаление выбранного фильтра */
const filter_selected = document.querySelectorAll('[data-filter-selected]');
if (filter_selected.length > 0) {
    filter_selected.forEach(item => {
        item.addEventListener('click', () => {
            item.remove();
        });
    });
}

/* Раскрытие фильтров на мобиле */
const filter_title = document.querySelectorAll('[data-filter-title]');
if (filter_title.length > 0) {
    filter_title.forEach(item => {
        let filter_content = item.closest('[data-filter-item]').querySelector('[data-filter-content]');

        if (filter_content) {
            let filter_animation = gsap.to(filter_content, {
                display: filter_content.getAttribute('data-filter-content') === 'flex' ? 'flex' : 'grid',
                opacity: 1
            }).pause();

            item.addEventListener('click', () => {
                if (document.documentElement.clientWidth < 992) {
                    item.classList.toggle('_active');

                    if (item.classList.contains('_active')) filter_animation.play();
                    else filter_animation.reverse();
                }
            });
        }
    });
}

/* Сортировка бриллиантов */
/*const diamonds_sorting = document.querySelectorAll('[data-diamonds-sorting]');
if (diamonds_sorting.length > 0) {
    diamonds_sorting.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('_asc')) {
                item.classList.remove('_asc');
                item.classList.add('_desc');
            } else {
                item.classList.remove('_desc');
                item.classList.add('_asc');
            }
        });
    });
}*/

/* Слайдер на странице товара */
const product_swiper = document.querySelector('[data-product-swiper]');
if (product_swiper) {
    let count_el = product_swiper.querySelector('[data-swiper-count]'),
        current_el = product_swiper.querySelector('[data-swiper-current]');

    new Swiper(product_swiper, {
        modules: [Navigation],
        slidesPerView: 1,
        speed: 1000,
        navigation: {
            prevEl: product_swiper.querySelector('[data-swiper-prev]'),
            nextEl: product_swiper.querySelector('[data-swiper-next]')
        },
        breakpoints: {
            0: {
                enabled: true
            },
            991: {
                enabled: false
            }
        },
        on: {
            init: function (el) {
                count_el.innerHTML = el['slides'].length;
            },
            activeIndexChange: function (el) {
                current_el.innerHTML = +el['activeIndex'] + 1;
            }
        }
    });
}

/* Спойлер */
const spoiler = document.querySelectorAll('[data-spoiler]');
if (spoiler.length > 0) {
    spoiler.forEach(item => {
        let spoiler_parent = item.closest('[data-spoiler-parent]'),
            spoiler_content = spoiler_parent.querySelector('[data-spoiler-content]'),
            spoiler_animation = gsap.to(spoiler_content, {
                display: item.getAttribute('data-spoiler') ? item.getAttribute('data-spoiler') : 'flex',
                opacity: 1
            }).pause();

        item.addEventListener('click', () => {
            item.classList.toggle('_active');
            spoiler_parent.classList.toggle('_active');

            if (item.classList.contains('_active')) spoiler_animation.play();
            else spoiler_animation.reverse();
        });
    });
}

/* Аккордион */
if ( document.querySelector('.accordion-container') ) {
    const ac = new Accordion('.accordion-container', {
        duration: 400
    });
    
    const accordion = document.querySelectorAll('.ac');
    if (accordion.length > 0) {
        if (document.documentElement.clientWidth > 1024) {
            accordion.forEach(item => {
                item.addEventListener('mouseenter', (e) => {
                    let idx = e.target.id.substr(3);
                    ac.open(idx);
                });
    
                item.addEventListener('mouseleave', (e) => {
                    let idx = e.target.id.substr(3);
                    ac.close(idx);
                });
            });        
        }
    }
}

/* Слайдер в продаже бриллиантов */
const sale_diamonds_swiper = document.querySelector('[data-sale-diamonds-swiper]');
if (sale_diamonds_swiper) {
    new Swiper(sale_diamonds_swiper, {
        modules: [Autoplay, Navigation],
        speed: 1000,
        spaceBetween: 30,
        centeredSlides: true,
        centeredSlidesBounds: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        navigation: {
            prevEl: sale_diamonds_swiper.querySelector('[data-swiper-prev]'),
            nextEl: sale_diamonds_swiper.querySelector('[data-swiper-next]')
        },
        breakpoints: {
            0: {
                slidesPerView: 1.5
            },
            575: {
                slidesPerView: 1.5
            },
            991: {
                slidesPerView: 2.5
            },
            1280: {
                slidesPerView: 3.5
            }
        }
    });
}

/* Следование за курсором */
const cursor_swipe = document.querySelector('[data-cursor-swipe]');
if (cursor_swipe) {
    let posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

    setInterval(function () {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        gsap.set(cursor_swipe, {
            css: {
                left: posX - 90,
                top: posY - 50
            }
        });
    }, 15);

    document.querySelector('body').addEventListener('mousemove', e => {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    const cursor_swipe_visible = document.querySelectorAll('[data-cursor-swipe-visible]');
    if (cursor_swipe_visible.length > 0) {
        cursor_swipe_visible.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor_swipe.classList.add('_active');
            });

            item.addEventListener('mouseleave', () => {
                cursor_swipe.classList.remove('_active');
            });
        });
    }
}

/* Расчет высоты в преимуществах продажи бриллиантов */
const sale_diamonds_pluses = document.querySelector('[data-sale-diamonds-pluses]'),
    sale_diamonds_pluses_item = document.querySelectorAll('[data-sale-diamonds-pluses-item]');

if (sale_diamonds_pluses && sale_diamonds_pluses_item.length > 0) {
    window.addEventListener('load', () => {
        get_min_height_diamonds_pluses_item();
    });

    window.addEventListener('resize', () => {
        get_min_height_diamonds_pluses_item();
    });

    function get_min_height_diamonds_pluses_item() {
        let max_height = 0;
        sale_diamonds_pluses_item.forEach(item => {
            if (item.clientHeight > max_height) max_height = item.clientHeight;
        });

        if (document.documentElement.clientWidth < 992) {
            sale_diamonds_pluses.style.minHeight = 'unset';
        } else {
            sale_diamonds_pluses.style.minHeight = max_height + 'px';
        }
    }
}

/* Ховер в преимуществах продажи бриллиантов */
const sale_diamonds_pluses_btn = document.querySelectorAll('[data-sale-diamonds-pluses-btn]');
if (sale_diamonds_pluses_btn.length > 0) {
    sale_diamonds_pluses_btn.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (document.documentElement.clientWidth > 991) {
                get_hover_diamonds_pluses();
            }

            window.addEventListener('resize', () => {
                if (document.documentElement.clientWidth > 991) {
                    get_hover_diamonds_pluses();
                }
            });

            function get_hover_diamonds_pluses() {
                sale_diamonds_pluses_btn.forEach(i => {
                    i.classList.remove('_active');
                });

                item.classList.add('_active');
            }
        });

        item.addEventListener('click', () => {
            if (document.documentElement.clientWidth < 992) {
                get_hover_diamonds_pluses();
            }

            window.addEventListener('resize', () => {
                if (document.documentElement.clientWidth < 992) {
                    get_hover_diamonds_pluses();
                }
            });

            function get_hover_diamonds_pluses() {
                item.classList.toggle('_active');
            }
        });
    });
}

/* Зависимые свайперы в коллекции бриллиантов */
const collection_diamonds_texts = document.querySelector('[data-collection-diamonds-texts-swiper]'),
    collection_diamonds_swiper = document.querySelector('[data-collection-diamonds-swiper]');
if (collection_diamonds_texts && collection_diamonds_swiper) {
    const collection_diamonds_swiper_init = new Swiper(collection_diamonds_swiper, {
        speed: 1000,
        on: {
            activeIndexChange: function (swiper) {
                collection_diamonds_texts_swiper.slideTo(swiper.activeIndex);
            }
        }
    });

    const collection_diamonds_texts_swiper = new Swiper(collection_diamonds_texts, {
        modules: [Navigation],
        speed: 1000,
        autoHeight: true,
        navigation: {
            prevEl: collection_diamonds_texts.querySelector('[data-swiper-prev]'),
            nextEl: collection_diamonds_texts.querySelector('[data-swiper-next]')
        },
        on: {
            activeIndexChange: function (swiper) {
                collection_diamonds_swiper_init.slideTo(swiper.activeIndex);
            }
        }
    });
}

/* Слайдер сотрудников */
const team_swiper = document.querySelector('[data-team-swiper]');
if (team_swiper) {
    new Swiper(team_swiper, {
        speed: 1000,
        breakpoints: {
            0: {
                slidesPerView: 2.1,
                enabled: true,
                spaceBetween: 10
            },
            991: {
                enabled: false,
                spaceBetween: 0
            }
        }
    });
}

/* Слайдер блога */
const blog_swiper = document.querySelectorAll('[data-blog-swiper]');
if (blog_swiper.length > 0) {
    blog_swiper.forEach(item => {
        new Swiper(item, {
            speed: 1000,
            breakpoints: {
                0: {
                    slidesPerView: 1.4,
                    enabled: true,
                    spaceBetween: 10
                },
                767: {
                    slidesPerView: 2.1,
                    enabled: true,
                    spaceBetween: 10
                },
                991: {
                    enabled: false,
                    spaceBetween: 0
                }
            }
        });
    });
}

/* Рессет формы */
const form_reset = document.querySelectorAll('[data-form-reset]');
if (form_reset.length > 0) {
    form_reset.forEach(item => {
        item.addEventListener('click', () => {
            let form = document.querySelector(item.getAttribute('data-form-reset'));
            if (form) form.reset();
        });
    });
}

/* Слайдеры в статье */
const article_swiper = document.querySelectorAll('[data-article-swiper]');
if (article_swiper.length > 0) {
    article_swiper.forEach(item => {
        new Swiper(item, {
            modules: [Navigation],
            speed: 1000,
            navigation: {
                prevEl: item.querySelector('[data-swiper-prev]'),
                nextEl: item.querySelector('[data-swiper-next]')
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                991: {
                    spaceBetween: 30,
                    slidesPerView: 2.8
                }
            }
        });
    });
}

/* Размер кольца */
const range_single = document.querySelector('[data-range-single]'),
    range_single_target = document.querySelector('[data-range-single-target]');
if (range_single) {
    let dpi_size = 3.3833;

    const uAgent = navigator.userAgent || '';

    const browser = {
        version: (uAgent.match(/.+(?:me|ox|on|rv|it|era|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
        opera: /opera/i.test(uAgent),
        msie: (/msie/i.test(uAgent) && !/opera/i.test(uAgent)),
        msie6: (/msie 6/i.test(uAgent) && !/opera/i.test(uAgent)),
        msie7: (/msie 7/i.test(uAgent) && !/opera/i.test(uAgent)),
        msie8: (/msie 8/i.test(uAgent) && !/opera/i.test(uAgent)),
        msie9: (/msie 9/i.test(uAgent) && !/opera/i.test(uAgent)),
        msie10: (/msie 10/i.test(uAgent) && !/opera/i.test(uAgent)),
        mozilla: /firefox/i.test(uAgent),
        chrome: /chrome/i.test(uAgent),
        safari: (!(/chrome/i.test(uAgent)) && /webkit|safari|khtml/i.test(uAgent)),
        iphone: /iphone/i.test(uAgent),
        ipod: /ipod/i.test(uAgent),
        iphone4: /iphone.*OS 4/i.test(uAgent),
        ipod4: /ipod.*OS 4/i.test(uAgent),
        ipad: /ipad/i.test(uAgent),
        ios: /ipad|ipod|iphone/i.test(uAgent),
        android: /android/i.test(uAgent),
        bada: /bada/i.test(uAgent),
        mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile/i.test(uAgent),
        msie_mobile: /iemobile/i.test(uAgent),
        safari_mobile: /iphone|ipod|ipad/i.test(uAgent),
        opera_mobile: /opera mini|opera mobi/i.test(uAgent),
        opera_mini: /opera mini/i.test(uAgent),
        mac: /mac/i.test(uAgent),
        webkit: /webkit/i.test(uAgent),
        android_version: parseFloat(uAgent.slice(uAgent.indexOf("Android") + 8)) || 0
    };

    if (browser.android || (browser.android_version > 0)) {
        dpi_size = 5.973;
    } else if (browser.safari || browser.safari_mobile || browser.ios || browser.ipad || browser.iphone || browser.iphone4 || browser.mac) {
        dpi_size = 6.373;
    }

    range_single_target.style.width = 14.5 * dpi_size + 'px';
    range_single_target.style.height = 14.5 * dpi_size + 'px';

    let rangeSliderElement = rangeSlider(range_single, {
        min: range_single.getAttribute('data-range-min'),
        max: range_single.getAttribute('data-range-max'),
        step: range_single.getAttribute('data-range-step'),
        value: [+range_single.getAttribute('data-range-min-value'), +range_single.getAttribute('data-range-max-value')],
        onInput: function (value, userInteraction) {
            range_single_target.innerHTML = value[1];
            range_single_target.style.width = value[1] * dpi_size + 'px';
            range_single_target.style.height = value[1] * dpi_size + 'px';
        }
    });

    let range_single_minus = document.querySelector('[data-range-minus]'),
        range_single_plus = document.querySelector('[data-range-plus]');

    if (range_single_minus) {
        range_single_minus.addEventListener('click', () => {
            let current_value = +rangeSliderElement.value()[1];
            if (current_value > range_single.getAttribute('data-range-min')) rangeSliderElement.value([range_single.getAttribute('data-range-min'), current_value - +range_single.getAttribute('data-range-step')]);
        });
    }

    if (range_single_plus) {
        range_single_plus.addEventListener('click', () => {
            let current_value = +rangeSliderElement.value()[1];
            if (current_value < range_single.getAttribute('data-range-max')) rangeSliderElement.value([range_single.getAttribute('data-range-min'), current_value + +range_single.getAttribute('data-range-step')]);
        });
    }
}

/* Стилизованный селект */
const style_select = document.querySelectorAll('.style-select');
if (style_select.length > 0) {
    style_select.forEach(item => {
        new Choices(item, {
            allowHTML: false,
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false
        });
    });
}

/* Стики сайдбар на странице товара */
if ( document.querySelector('.product-page__content-wrap') ) {
    const sticky_sidebar_init = new stickySidebar('.product-page__content-wrap', {
        topSpacing: 120,
        bottomSpacing: 0,
        minWidth: 991,
        containerSelector: '.product-page__content',
        innerWrapperSelector: '.product-page__content',
        resizeSensor: true
    });

    let data_sticky_resizers = document.querySelectorAll('.product-page__content-wrap [data-spoiler]');
    if ( data_sticky_resizers.length > 0 ) {
        data_sticky_resizers.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(() => {
                    sticky_sidebar_init.updateSticky();
                }, 1000);
            });
        });
    }

    window.addEventListener('resize', () => {
        sticky_sidebar_init.updateSticky();
    });
}

/* Синхронизация категорий в фильтре */
/*const filter_category = document.querySelectorAll('[data-filter-category]');
if (filter_category.length > 0) {
    filter_category.forEach(item => {
        item.addEventListener('change', () => {
            let target = document.querySelector('[data-filter-category-target="'+item.getAttribute('data-filter-category')+'"]');
            if (target) target.checked = item.checked;
        });
    });
}*/

/* Переключалка изображений при наведении в карточке товара */
const product_pictures = document.querySelectorAll('[data-product-pictures]');
if (product_pictures.length > 0) {
    product_pictures.forEach(item => {
        let pictures = item.querySelectorAll('picture'); 
        if (pictures.length > 0) {
            let mouseModal = item.closest('.fashion-modal');

            item.addEventListener('mousemove', (e) => {
                let mouseX = (e.clientX + 0.01) - item.closest('.product').offsetLeft,
                    nav_width = item.offsetWidth / pictures.length;
                
                if (mouseModal) mouseX = mouseX - mouseModal.offsetLeft;
                
                pictures.forEach(pic => {
                    if ( +pic.getAttribute('data-item') === Math.ceil(mouseX/nav_width) ) pic.classList.add('_active');
                        else pic.classList.remove('_active');
                });
            });

            item.addEventListener('mouseleave', () => {
                pictures.forEach(pic => {
                    if ( +pic.getAttribute('data-item') === 1 ) pic.classList.add('_active');
                        else pic.classList.remove('_active');
                });
            });
        }
    });
}

/* Маска ввода только целых чисел */
const input_int = document.querySelectorAll('[data-input-int]');
if (input_int.length > 0) {
    input_int.forEach(item => {
        item.addEventListener('keypress', evt => {
            var theEvent = evt || window.event;

            if (theEvent.type === 'paste') {
                key = event.clipboardData.getData('text/plain');
            } else {
                var key = theEvent.keyCode || theEvent.which;
                key = String.fromCharCode(key);
            }

            var regex = /[0-9]/;

            if (!regex.test(key)) {
                theEvent.returnValue = false;
                if (theEvent.preventDefault) theEvent.preventDefault();
            }
        });
    });
}

/* Спойлер фильтров */
const filter_spoiler = document.querySelector('[data-filter-spoiler]');
if (filter_spoiler) {
    filter_spoiler.addEventListener('click', () => {
        let form = filter_spoiler.closest('[data-filter]');
        if (form) form.classList.toggle('_active');
    });
}

/* Аккордион в фильтрах */
const filter_tabs = document.querySelectorAll('[data-tab-filter]');
if (filter_tabs.length > 0) {
    filter_tabs.forEach(item => {
        item.addEventListener('click', () => {
            let i = item.getAttribute('data-tab-filter'),
                content = item.closest('[data-tab-filter-parent]').querySelectorAll('[data-tab-filter-content]');

            if (item.classList.contains('_active')) {
                item.classList.remove('_active');
                document.querySelector('[data-tab-filter-content="'+i+'"]').classList.remove('_active');
            } else {
                filter_tabs.forEach(row => {
                    if (row.getAttribute('data-tab-filter') === i) row.classList.add('_active');
                    else row.classList.remove('_active');
                });
    
                if (content.length > 0) {
                    content.forEach(row => {
                        if (row.getAttribute('data-tab-filter-content') === i) row.classList.add('_active');
                        else row.classList.remove('_active');
                    });
                }
            }
        });
    });
}

/* 
    Временный скрипт - открытие модального окна после отправки формы 
    Удалить атрибут data-open-thankyou у кнопок отправки формы и повесить это все на событие отправки формы на бэке
*/
const fancybox_thankyou = document.querySelectorAll('[data-open-thankyou]');
if (fancybox_thankyou.length > 0) {
    fancybox_thankyou.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            Fancybox.close();
            Fancybox.show(
                [
                    {
                        src: '#modal-thankyou',
                        type: "inline"
                    }
                ]
            )
        });
    });
}