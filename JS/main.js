/* ====================
	ハンバーガー開閉
==================== */
// jQueryで書いてく（ver-2.2.4）
$(window).on('load', function() {
	// humにハンバーガーメニューと閉じるボタンを格納
	const hum = $('#hamburger, .close')
	// navにスマホのナビメニューを格納
	const nav = $('.sp-nav')
	// humに入れた要素をクリックしたら
	hum.on('click', function(){
		// navに入れた要素に.toggleを足したり消したらラジバンダリ
		nav.toggleClass('toggle');
	});
}(jQuery));


/* ====================
	スムーススクロール
==================== */
// イージング関数
var Ease = {
	easeInOut: function (t) {
		return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
	}
}
// アニメーション Duration
var duration = 500;
window.addEventListener('DOMContentLoaded', function(){

	// スムーススクロールのトリガー取得（IE対策）
	var smoothScrollTriggers = [].slice.call(document.querySelectorAll('a[href^="#"]'));
	smoothScrollTriggers.forEach(function (smoothScrollTrigger) {
		// トリガーをクリックした時に実行
		smoothScrollTrigger.addEventListener('click', function (e) {
			// href属性の値を取得
			var href = smoothScrollTrigger.getAttribute('href');
			// 現在のスクロール位置の取得（クロスブラウザに対応できるように）
			var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
			// スクロール先の要素を取得
			var targetElement = document.getElementById(href.replace('#', ''));

			// スクロール先の要素が存在する時＝スムーススクロールを実行
			if(targetElement) {
				// デフォルトのアクションをキャンセル
				e.preventDefault();
				e.stopPropagation();
				// スクロール先の位置を取得(headerと余白分ずらした)
				var targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - 80;
				// スタート時の時間を取得
				var startTime = performance.now();
				// アニメーションループの定義
				var loop = function (nowTime) {
					// スタートからの時間
					var time = nowTime - startTime;
					// durationを1とした時の経過時間
					var normalizedTime = time / duration;
					// durationに経過時間が未達成の時にアニメーションを実行
					if (normalizedTime < 1) {
						// 経過時間とイージングに応じてスクロール位置を変える
						window.scrollTo(0, currentPosition + ((targetPosition - currentPosition) * Ease.easeInOut(normalizedTime)));
						// アニメーションの継続
						requestAnimationFrame(loop);
					// durationに時間経過の達成でアニメーション終了
					}else{
						window.scrollTo(0, targetPosition);
					}
				}
			// アニメーションスタート
			requestAnimationFrame(loop);
			}
		});
	});
});