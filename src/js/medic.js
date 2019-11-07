/**
 * Класс сведений о лечебных учреждениях
 * Гребенёв Олег <admin@infoblog72.ru>
 */
class Medic {
  constructor (options) {
    if (this.checkIdMedic(options) && this.checkStorage(options)) {
      this.init(options)
    }
  }

  checkIdMedic (options) {
    if ('idMedic' in options) {
      this.medicForm = $('#' + options.idMedic)
      if (this.medicForm.length !== 0) {
        return true
      }
    }
    return false
  }

  checkStorage (options) {
    if ('storage' in options) {
      if (typeof options.storage != 'undefined') {
        return true
      }
    }
    return false
  }

  async init (options) {
    this.storage = options.storage

    const data = await this.storage.load()
    if (data === null) {
      return false
    } else {
      this.info = data.LPU
    }

    this.creatingData()
    this.chevron()
    this.allDown()
  }

  creatingData () {
    this.treeData = _(this.info).groupBy('hid').value()
    this.headers = []

    for (let prop in this.treeData) {
      if (this.treeData.hasOwnProperty(prop)) {
        if (prop !== 'null') {
          const obj = _.find(this.info, {'id': prop})
          this.headers.push(obj)

          let arr = this.treeData['null']
          arr.splice(_.findIndex(arr, {'id': prop}), 1)
          this.treeData['null'] = arr
        }
      }
    }
    this.headers = _.sortBy(this.headers, ['full_name'])
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
