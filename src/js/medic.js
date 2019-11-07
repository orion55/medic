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

  async init () {
    this.storage = new LocalSt()

    const data = await this.storage.load()
    if (data === null) {
      return false
    } else {
      this.info = data.LPU
    }
    this.info.forEach((elem) => {
      if (elem.full_name !== null) { elem.full_name = elem.full_name.replace(/<[^>]+>/g, '').trim() }
      if (elem.address !== null) { elem.address = elem.address.trim()}
      if (elem.phone !== null) {elem.phone = elem.phone.trim()}
    })
    console.log(_(this.info).groupBy('hid').value())
    // console.log(this.info)
    this.chevron()
    this.allDown()
  }

  chevron () {
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
  }

  allDown () {
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
