/**
 * Класс сведений о лечебных учреждениях
 * Гребенёв Олег <admin@infoblog72.ru>
 */
class Medic {
  constructor (options) {
    this.checkIdMedic(options)
  }

  checkIdMedic (options) {
    if ('idMedic' in options) {
      this.medicForm = $('#' + options.idMedic)
      if (this.medicForm.length !== 0) {
        this.init()
      }
    }
  }

  init () {
    this.storage = new LocalSt()

    this.storage.load()
      .then((data) => {
        if (data === null) {
          return false
        } else {
          this.info = data
        }
        console.log(this.info)
      })

    $('.collapse.show').each(function () {
      $(this)
        .prev('.card-header')
        .find('.fas')
        .addClass('fa-chevron-up')
        .removeClass('fa-chevron-down')
    })

    $('.collapse').on('show.bs.collapse', function () {
      $(this)
        .prev('.card-header')
        .find('.fas')
        .removeClass('fa-chevron-down')
        .addClass('fa-chevron-up')
    }).on('hide.bs.collapse', function () {
      $(this)
        .prev('.card-header')
        .find('.fas')
        .removeClass('fa-chevron-up')
        .addClass('fa-chevron-down')
    })

    $('#medicAllDown').click(function () {
      let btn = $(this).find('.fas')
      if (btn.hasClass('fa-angle-double-down')) {
        btn.removeClass('fa-angle-double-down').addClass('fa-angle-double-up')
        $('.medic__panel')
          .removeData('bs.collapse')
          .collapse({
            parent: '',
            toggle: false,
          })
          .collapse('show')
          .removeData('bs.collapse')
          .collapse({
            parent: '#medicAccordion',
            toggle: false,
          })
      } else {
        btn.removeClass('fa-angle-double-up').addClass('fa-angle-double-down')
        $('.medic__panel')
          .removeData('bs.collapse')
          .collapse({
            parent: '',
            toggle: false,
          })
          .collapse('hide')
          .removeData('bs.collapse')
          .collapse({
            parent: '#medicAccordion',
            toggle: false,
          })
      }

    })

  }
}

// module.exports = Medic
