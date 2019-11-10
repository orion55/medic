/**
 * Класс работы с LocalStorage
 * Гребенёв Олег <admin@infoblog72.ru>
 */
class LocalSt {

  save (data) {
    localStorage.setItem('json', JSON.stringify(data))
  }

  async load () {
    const value = localStorage.getItem('json')
    if (!value) {
      try {
        const result = await $.get('json/lpu.json')
        this.save(this.optimize(result))
        return result
      } catch (error) {
        console.error(`Ошибка: ${error.statusText}`)
        return null
      }
    } else {
      return value ? JSON.parse(value) : null
    }
  }

  erase () {
    localStorage.removeItem('json')
  }

  optimize (data) {
    let info = data.LPU

    info.forEach((elem) => {
      if (elem.full_name !== null) {
        elem.full_name = elem.full_name.replace(/<[^>]+>/g, '').trim()
      }
      if (elem.address !== null) { elem.address = elem.address.trim()}
      if (elem.phone !== null) {elem.phone = elem.phone.trim()}
    })
    return {'LPU': info}
  }

  get () {
    return localStorage.getItem('json')
  }
}
