class LocalSt {

  save (data) {
    localStorage.setItem('json', JSON.stringify(data))
  }

  async load () {
    if (!localStorage.getItem('json')) {
      try {
        const result = await $.get('json/lpu.json')
        this.save(result)
        return result
      } catch (error) {
        console.error(`Ошибка: ${error.statusText}`)
        return null
      }
    } else {
      const value = localStorage.getItem('json')
      return value ? JSON.parse(value) : null
    }
  }

  erase () {
    localStorage.removeItem('json')
  }
}
