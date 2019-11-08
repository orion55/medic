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

    this.displayHead()
    this.dispalayAccordion()

    this.activateCard()

    this.chevron()
    this.allDown()

    this.createModal()
    this.rowClick()
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

    for (let prop in this.treeData) {
      if (this.treeData.hasOwnProperty(prop)) {
        let arr = this.treeData[prop]
        arr = _.sortBy(arr, ['full_name'])
        this.treeData[prop] = arr
      }
    }

    this.headers = _.sortBy(this.headers, ['full_name'])
  }

  displayHead () {
    this.medicForm.prepend(`<div class="medic__control-panel">
                <button type="button" class="btn btn-info" id="medicAdd"
                        title="Добавить запись"><i class="fas fa-plus"></i></button>
                <button type="button" class="btn btn-info" id="medicAllDown"
                        title="Свернуть\\развернуть всё"><i
                        class="fas fa-angle-double-down"></i></button>
                <button type="button" class="btn btn-info" id="medicJson"
                        title="Скачать json"><i
                        class="fas fa-download"></i></button>
            </div>
            <table class="table table-hover table-bordered medic__table">
                <thead>
                <tr>
                    <th scope="col" class="medic-col-1">Наименование</th>
                    <th scope="col" class="medic-col-2">Адрес</th>
                    <th scope="col" class="medic-col-3">Телефон</th>
                </tr>
                </thead>
            </table>
            <div class="accordion" id="medicAccordion"></div>`)
  }

  dispalayAccordion () {
    this.medicAccordion = $('#medicAccordion')
    this.displayCard(null)
    this.headers.forEach((elem) => {
      this.displayCard(elem.id)
    })
  }

  displayCard (id) {
    let obj
    if (id !== null) {
      obj = _.find(this.headers, {'id': id})
    } else {
      obj = {'full_name': 'Без категории', 'address': null, 'phone': null}
    }

    this.medicAccordion.append(`<div class="card" id="card-${id}">
        <div class="card-header medic__header medic__card" id="heading-${id}">
            <table class="table table-hover table-bordered medic__table medic__header"><thead>
                <tr class="mb-0 medic__title-card" data-toggle="collapse"
                    data-target="#collapse-${id}" aria-expanded="true"
                    aria-controls="collapse-${id}">
                    <td class="medic-col-1">
                        <i class="fas fa-chevron-down medic__fas"></i>${obj.full_name !== null ? obj.full_name : ''}
                    </td>
                    <td class="medic-col-2">${obj.address !== null ? obj.address : ''}</td>
                    <td class="medic-col-3">${obj.phone !== null ? obj.phone : ''}</td>
                </tr>
                </thead>
            </table>
        </div>`)

    this.displayCardBody(id)

    this.medicAccordion.last(`</div>`)

  }

  displayCardBody (hid) {
    let arr = this.treeData[hid]
    let curCard = $(`#card-${hid}`)

    curCard.append(`<div id="collapse-${hid}" class="medic__panel collapse"
             aria-labelledby="heading-${hid}"
             data-parent="#medicAccordion">
            <div class="card-body medic__card">
                <table class="table table-hover table-bordered medic__table" id="table-${hid}"><tbody>`)

    let curTable = $(`#table-${hid}`)
    arr.forEach((elem) => {
      curTable.append(`<tr class="medic__row" data-id="${elem.id}" data-hid="${hid}" >
                        <td class="medic-col-1">${elem.full_name !== null ? elem.full_name : ''}</td>
                        <td class="medic-col-2">${elem.address !== null ? elem.address : ''}</td>
                        <td class="medic-col-3">${elem.phone !== null ? elem.phone : ''}</td>
                    </tr>`)
    })

    curCard.last(`</tbody></table>
            </div>
        </div>`)

  }

  activateCard () {
    let id = this.headers[0].id
    $(`#collapse-${id}`).addClass('show')
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

  createModal () {
    this.medicForm.append(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div>`)
  }

  rowClick () {
    $('.medic__row').click(function (event) {
      console.log($(event.currentTarget).data())
      $('#exampleModal').modal('show')
    })
  }
}
