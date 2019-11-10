/**
 * Класс сведений о лечебных учреждениях
 * Гребенёв Олег <admin@infoblog72.ru>
 */
class Medic {
  constructor (options) {
    //Проверяем параметры, переданные в опциях
    if (this.checkIdMedic(options) && this.checkStorage(options)) {
      this.init(options)
    }
  }

  //Проверка параметка идентификатор, куда будет вставляться список
  checkIdMedic (options) {
    if ('idMedic' in options) {
      this.medicForm = $('#' + options.idMedic)
      if (this.medicForm.length !== 0) {
        return true
      }
    }
    return false
  }

  //проверка параметра хранилища
  checkStorage (options) {
    if ('storage' in options) {
      if (typeof options.storage != 'undefined') {
        return true
      }
    }
    return false
  }

  //функция инициализации
  async init (options) {
    this.storage = options.storage

    const data = await this.storage.load()
    if (data === null) {
      return false
    } else {
      this.info = data.LPU
    }

    this.id = 0
    this.hid = 0

    this.creatingData()

    this.displayHead()
    this.dispalayAccordion()

    this.hid = this.headers[0].id
    this.activateCard(this.hid)

    this.chevron()
    this.allDown()

    this.createModal()
    this.createDialog()

    this.rowClick()
    this.okModalClick()
    this.removeModalClick()
    this.removeModalClickOk()

    this.addButton()
    this.jsonButton()
  }

  //Создание данных в виде двухуровневой иерархии: заголовки и данные
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

  //Вывод заголовка таблицы
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

  //Вывод "аккордеона" для отображения данных о лечебных учреждениях
  dispalayAccordion () {
    this.medicAccordion = $('#medicAccordion')
    this.medicAccordion.empty()
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
      obj = {
        'full_name': 'Без категории',
        'address': null,
        'phone': null,
      }
    }

    this.medicAccordion.append(`<div class="card" id="card-${id}">
        <div class="card-header medic__header medic__card" id="heading-${id}">
            <table class="table table-hover table-bordered medic__table medic__header"><thead>
                <tr class="mb-0 medic__title-card" data-toggle="collapse"
                    data-target="#collapse-${id}" aria-expanded="true"
                    aria-controls="collapse-${id}">
                    <td class="medic-col-1">
                        <i class="fas fa-chevron-down medic__fas"></i>${obj.full_name !== null
      ? obj.full_name
      : ''}
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

  activateCard (hid) {
    $(`#collapse-${hid}`).addClass('show')
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
    this.medicForm.append(`<div class="modal fade" id="medicModal" tabindex="-1" role="dialog" aria-labelledby="medicModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="medicModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="medicFormik">
        <div class="form-group">
            <label for="recipient-name" class="col-form-label">Категория</label>
            <select class="form-control" id="medic-headers">
              <option value="null">Без категории</option>
              <option>2</option>
            </select>
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Наименование</label>
            <input type="text" class="form-control" id="medic-full_name" required>
             <div class="invalid-feedback">
                Введите наименование. Это поле не пустое.
              </div>
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Адрес</label>
            <input type="text" class="form-control" id="medic-address" required>
             <div class="invalid-feedback">
                Введите адрес. Это поле не пустое.
              </div>
          </div>
           <div class="form-group">
            <label for="message-text" class="col-form-label">Телефон</label>
            <input type="text" class="form-control" id="medic-phone" required>
             <div class="invalid-feedback">
                Введите телефон. Это поле не пустое.
              </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" id="medic__remove">Удалить запись</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
        <button type="button" class="btn btn-info" id="medic__ok">Ok</button>
      </div>
    </div>
  </div>
</div>`)

    this.medicModal = $('#medicModal')
    this.medicFormik = $('#medicFormik')[0]
  }

  createDialog () {
    this.medicForm.append(`<div class="modal fade" id="medicDialog" tabindex="-1" role="dialog" aria-labelledby="medicDialogLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="medicDialogLabel">Вы действительно хотите удалить запись?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="medic__dialog-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-danger" id="medic__dialog-ok">Ok</button>
          </div>
        </div>
      </div>
    </div>`)

    this.medicDialog = $('#medicDialog')
  }

  rowClick () {
    $('.medic__row').click((event) => {
      this.id = $(event.currentTarget).data().id
      this.hid = $(event.currentTarget).data().hid
      this.showModal(this.id, this.hid, 'Редактирование записи')
    })
  }

  okModalClick () {
    $('#medic__ok').click((event) => {
      if (!this.medicFormik.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        this.saveRecord(this.id, this.hid)
        this.medicModal.modal('hide')
      }
      this.medicFormik.classList.add('was-validated')
    })
  }

  removeModalClick () {
    $('#medic__remove').click((event) => {
      this.medicModal.modal('hide')

      const obj = _.find(this.info, {'id': this.id + ''})
      $('#medic__dialog-body').text(obj.full_name)

      this.medicDialog.modal('show')
    })
  }

  removeModalClickOk () {
    $('#medic__dialog-ok').click(() => {
      this.info.splice(_.findIndex(this.info, {'id': this.id + ''}), 1)
      this.medicDialog.modal('hide')
      this.storage.save({'LPU': this.info})
      this.refreshRecord(this.hid)
    })
  }

  saveRecord (id, hid) {
    let obj = _.find(this.info, {'id': id + ''})
    this.hid = $('#medic-headers option:selected').val() + ''

    if (obj !== undefined) {
      obj.full_name = $('#medic-full_name').val()
      obj.address = $('#medic-address').val()
      obj.phone = $('#medic-phone').val()
      obj.hid = this.hid
    } else {
      this.info.push({
        id: this.id + '',
        hid: this.hid,
        full_name: $('#medic-full_name').val(),
        address: $('#medic-address').val(),
        phone: $('#medic-phone').val(),
      })
    }
    this.storage.save({'LPU': this.info})

    this.refreshRecord(this.hid)
  }

  refreshRecord (hid) {
    this.creatingData()
    this.dispalayAccordion()
    this.rowClick()
    this.activateCard(hid)
  }

  showModal (id, hid, title = '') {
    this.medicFormik.classList.remove('was-validated')

    const category = $('#medic-headers')
    category.empty()

    $(
      '<option />',
      {
        value: 'null',
        text: 'Без категории',
      }).appendTo(category)

    this.headers.forEach((elem) => {

      $(
        '<option />',
        {
          value: elem.id,
          text: elem.full_name,
        }).appendTo(category)
    })

    $(`#medic-headers option[value=${hid}]`).attr('selected', 'selected')

    const obj = _.find(this.info, {'id': id + ''})

    if (obj !== undefined) {
      $('#medic-full_name').val(this.isNull(obj.full_name))
      $('#medic-address').val(this.isNull(obj.address))
      $('#medic-phone').val(this.isNull(obj.phone))
    } else {
      $('#medic-full_name').val('')
      $('#medic-address').val('')
      $('#medic-phone').val('')
    }

    $('#medicModalLabel').text(title)

    this.medicModal.modal('show')
  }

  isNull (val) {
    return _.isNull(val) ? '' : val
  }

  addButton () {
    $('#medicAdd').click(() => {
      this.id = _.maxBy(this.info, function (o) { return +o.id }).id + 1
      this.hid = null

      this.showModal(this.id, this.hid, 'Добавить новую запись')
    })
  }

  jsonButton () {
    $('#medicJson').click(() => {
      const json = this.storage.get()
      let a = document.createElement('a')
      this.medicForm.after(a)
      a.style = 'display: none'
      let blob = new Blob([json], {type: 'octet/stream'}),
        url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = '.result.json'
      a.click()
      window.URL.revokeObjectURL(url)
      $(a).remove()
    })
  }
}
