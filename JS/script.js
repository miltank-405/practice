/* ====================
	スムーススクロール
==================== */
// href="#"のaタグを取得→hrefからidを抜き出す
const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
// for文を使ってaタグに対してクリックイベント
	for(let i = 0; i < smoothScrollTrigger.length; i++){
		smoothScrollTrigger[i].addEventListener('click', (e) => {
			// デフォルトの動作をキャンセル
			e.preventDefault();
			// href=""の中身を呼び出す
			let href = smoothScrollTrigger[i].getAttribute('href');
			// 試しに出るか確認->出ないじゃん！
			console.log(href)
			// #を除外
			let targetElement = document.getElementById(href.replace('#',''));
			// 試しに出るか確認->まぁ出ないよねw
			console.log(targetElement)
			// ターゲットの位置を取得
			// ブラウザから高さをゲット
			const rect = targetElement.getBoundingClientRect().top;
			// スクロール量をゲット
			const offset = window.pageYOffset;
			// 固定ヘッダー分の高さ
			const gap = 60;
			// ウィンドウからターゲットまでの距離
			const target = rect + offset - gap;

			// スムースなスクロール！
			window.scrollTo({
				top: target,
				behavior: 'smooth'
			});
		});
	}