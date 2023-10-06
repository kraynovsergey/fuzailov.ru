/* Определение поддержки WEBP */
export function isWebp() {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

/* Маска телефон */
export function phone_mask() {
    window.addEventListener("DOMContentLoaded", () => {
        [].forEach.call(document.querySelectorAll('[data-tel]'), (input) => {
            let keyCode;

            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                let pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                let matrix = "+7 (___) ___-__-__",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i !== -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function (a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type === "blur" && this.value.length < 5) this.value = ""
            }

            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false);
        });
    });
}

/* Политика конфиденциальности */
export function privacy_policy() {
    const data_policy = document.querySelectorAll('[data-policy]');
    if (data_policy.length > 0) {
        data_policy.forEach(item => {
            validate_privacy_policy(item);

            item.addEventListener('change', () => {
                validate_privacy_policy(item);
            });
        })

        function validate_privacy_policy(item) {
            let btn_submit = item.closest('form').querySelector('button[type="submit"]');
            item.checked ? btn_submit.disabled = false : btn_submit.disabled = true;
        }
    }
}

/* Табы */
export function tabs() {
    const tabs = document.querySelectorAll('[data-tab]');
    if (tabs.length > 0) {
        tabs.forEach(item => {
            item.addEventListener('click', () => {
                let i = item.getAttribute('data-tab'),
                    content = item.closest('[data-tab-parent]').querySelectorAll('[data-tab-content]');

                tabs.forEach(row => {
                    if (row.getAttribute('data-tab') === i) row.classList.add('_active');
                    else row.classList.remove('_active');
                });

                if (content.length > 0) {
                    content.forEach(row => {
                        if (row.getAttribute('data-tab-content') === i) row.classList.add('_active');
                        else row.classList.remove('_active');
                    });
                }
            });
        });
    }
}

/* Изменение количества */
export function product_count() {
    const count_btn = document.querySelectorAll('[data-count-btn]');
    if (count_btn.length > 0) {
        count_btn.forEach(btn => {
            btn.addEventListener('click', () => {
                let input = btn.closest('[data-count]').querySelector('[data-count-input]');

                if (input) {
                    if (btn.hasAttribute('data-count-minus') && input.value > 1) input.value = input.value - 1;
                    if (btn.hasAttribute('data-count-plus')) input.value++;
                }
            });
        });
    }
}