/* Utils */
function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}


/* Inits */
let plx = new Parallax(document.getElementById('main'), {
    pointerEvents: true,
    hoverElement: true,
    frictionX: 0.025,
    frictionY: 0.025
});

$(() => {
    $('.page-div').each((_, el) => {
        $(el).html('<p class="unselectable">' + $(el).attr('data-content') + '</p>')
    });
})

$('.page-div').on('click', function(e) {
    if (this.classList.contains('selected'))
        closePage();
    else
        openPage(this);
})

/* Logic */
function openPage(btn) {
    let page = $(btn);
    page.addClass('selected', 1000)
        .css('z-index', '10')
        .children().fadeOut();
    delay(500).then(() => page.html(
        `
   <div class="dank-ass-loader">
      <div class="row">
         <div class="arrow up outer outer-18"></div>
         <div class="arrow down outer outer-17"></div>
         <div class="arrow up outer outer-16"></div>
         <div class="arrow down outer outer-15"></div>
         <div class="arrow up outer outer-14"></div>
      </div>
      <div class="row">
         <div class="arrow up outer outer-1"></div>
         <div class="arrow down outer outer-2"></div>
         <div class="arrow up inner inner-6"></div>
         <div class="arrow down inner inner-5"></div>
         <div class="arrow up inner inner-4"></div>
         <div class="arrow down outer outer-13"></div>
         <div class="arrow up outer outer-12"></div>
      </div>
      <div class="row">
         <div class="arrow down outer outer-3"></div>
         <div class="arrow up outer outer-4"></div>
         <div class="arrow down inner inner-1"></div>
         <div class="arrow up inner inner-2"></div>
         <div class="arrow down inner inner-3"></div>
         <div class="arrow up outer outer-11"></div>
         <div class="arrow down outer outer-10"></div>
      </div>
      <div class="row">
         <div class="arrow down outer outer-5"></div>
         <div class="arrow up outer outer-6"></div>
         <div class="arrow down outer outer-7"></div>
         <div class="arrow up outer outer-8"></div>
         <div class="arrow down outer outer-9"></div>
      </div>
   </div>
`));
    Promise.all([
        delay(2000),
        fetch('pages/' + page.attr('data-page') + '.htm')
    ]).then(
        ress => ress[1].text()
    ).then(text =>
        page.hasClass('selected') ? page.html(text) : undefined
    );
}

function closePage() {
    let page = $('.page-div.selected');
    page.removeClass('selected', 1000)
        .html('');
    delay(500).then(() => page
        .html('<p class="unselectable">' + $(page).attr('data-content') + '</p>')
        .css('z-index', ''));
}