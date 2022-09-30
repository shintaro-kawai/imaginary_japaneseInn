/* ヘッダーの高さ分だけコンテンツを下げる
=================================== */
$(function () {
  let height = $(".header").height();
  $("body").css("margin-top", height); // +10: 10pxだけ余裕をもたせる
});



/* 順番にふわっと表示 
==================== */
function delayScrollAnime() {

  /* まずは背景を透明にする */
  let alpha = 0.7; // 透明度
  const rgba_set = `rgba(255, 255, 255, ${alpha})`;
  let elapsed_time = 3000; // 処理時間
  $('#toumei').animate({ backgroundColor: rgba_set }, elapsed_time);

  // 次に4つの文字がフェードイン
  setTimeout(() => {
    let time = 0.3;  // 遅延時間を増やす秒数の値
    let value = time;
    $('.delayScroll').each(function () {
      let parent = this;                     // 親要素を取得
      let elemPos = $(this).offset().top;    // 要素の位置まで来たら
      let scroll = $(window).scrollTop();    // スクロール値を取得
      let windowHeight = $(window).height(); // 画面の高さを取得
      let childs = $(this).children();       // 子要素を取得

      if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {
        // 指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
        $(childs).each(function () {

          if (!$(this).hasClass("fadeUp")) { // アニメーションのクラス名が指定されているかどうかをチェック

            $(parent).addClass("play"); // 親要素にクラス名playを追加
            $(this).css("animation-delay", value + "s"); // アニメーション遅延のCSS animation-delayを追加し
            $(this).addClass("fadeUp"); // アニメーションのクラス名を追加
            value = value + time; // delay時間を増加させる

            // 全ての処理を終わったらplayを外す
            let index = $(childs).index(this);
            if ((childs.length - 1) == index) {
              $(parent).removeClass("play");
            }
          }
        })
      } else {
        $(childs).removeClass("fadeUp");
        value = time; // delay初期値の数値に戻す
      }
    })
  }, elapsed_time + 500)
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  delayScrollAnime();
});

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  delayScrollAnime();
});



/* animated.css & WOW.js Animation 
=================================== */
$(function () {
  new WOW().init();
});



/* 下にスクロールしていくとだんだん指定要素が透明になる
============================================== */
/* -- Memo -- 
要素がwindow最上部にきた時
  scroll = 340
  current = 0
要素がwindow中央にきた時
  scroll = 133
  current = -0.2163
要素がwindow最下部にきた時
  scroll = 0
  current = -0.3553
*/
// $('#top-title').each(function () {

//   let $win = $(window),
//     $winH = $win.height(), // window高さ
//     $connect = $(this), // その要素自体に適用する場合
//     $applyTo = $('.toumei'), // opacity適用先
//     position = $connect.offset().top, // 画面最上部からの距離
//     current = 1,
//     alpha = 0, // rgbaのa
//     scroll;

//   $win.on('load scroll', function () {
//     scroll = $win.scrollTop(); // ブラウザ全体のスクロール距離
//     current = (0 - (position - scroll) / $winH);
//     console.log("position: " + position);
//     console.log("scroll: " + scroll);
//     console.log("current: " + current);

//     /* 数値・計算式は要素に応じて調整 */
//     if (current <= -0.2) {
//       alpha = 0;
//     } else if (-0.2 < current && current < -0) {
//       alpha = (current + 0.2) * 3;
//     } else {
//       alpha = 0.6;
//     }

//     /* 適用先要素にalpha指定 */
//     const rgba_set = `rgba(255, 255, 255, ${alpha})`;
//     console.log(rgba_set);
//     $applyTo.css({ 'background-color': rgba_set });
//   });
// });

/* header > nav: ハンバーガーメニュー
================================== */
const ham = document.querySelector('#js-hamburger'); //js-hamburgerの要素を取得し、変数hamに格納
const nav = document.querySelector('#js-nav'); //js-navの要素を取得し、変数navに格納

ham.addEventListener('click', function () {
  console.log('ok!');
  ham.classList.toggle('active'); // ハンバーガーメニューにactiveクラスを付け外し
  nav.classList.toggle('active'); // ナビメニューにactiveクラスを付け外し
});


/* スムーズスクロールでページ内リンク
================================ */

// フッターで隠れないように高さ位置調整の値
let corr_num = 170;

$(function () {
  // #で始まるアンカーをクリックした場合に処理
  $('a[href^="#"]').click(function () {
    console.log("Smooth Scrolling");
    // スクロールの速度 (ミリ秒)
    let speed = 500;
    // アンカーの値取得
    let href = $(this).attr("href");
    // 移動先を取得
    let target = $(href == "#" || href == "" ? 'html' : href);
    // 移動先を数値で取得
    let position = target.offset().top - corr_num;
    // スムーススクロール
    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });
});