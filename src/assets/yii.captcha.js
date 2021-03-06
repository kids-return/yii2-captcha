/**
 * Yii Captcha widget.
 *
 * This is the JavaScript widget used by the yii\captcha\Captcha widget.
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 * @author Alexaner Makarov <sam@rmcreative.ru>
 * @since 1.0
 */
function YiiCaptcha(el) {
    var refreshUrl,
        hashKey;

    this.init = function (options) {
        if (options.hasOwnProperty('refreshUrl')) {
            refreshUrl = options.refreshUrl;
        }

        if (options.hasOwnProperty('hashKey')) {
            hashKey = options.hashKey;
        }

        el.addEventListener('click', this.refresh);
    };

    this.refresh = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange  = function (e) {
            try {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        el.setAttribute('src', data.url);
                        docuement.getElementsByTagName('body').item(0).setAttribute('data-' + hashKey, [data.hash1, data.hash2]);
                    } else {
                        alert('There was a problem refreshing captcha.');
                    }
                }
            } catch (e) {
                alert('There was a problem refreshing captcha: ' + e.description);
            }
        };
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.setRequestHeader('Content-Type', 'application/json');
        request.open('GET', refreshUrl);
        request.send();
    };

    this.destroy = function () {
        el.removeEventListener('click', this.refresh);
    }
}
