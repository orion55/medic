$(document).ready(function () {
  //Точка входа в программу

  //создаём хранилище, которое работает с LocalStorage
  let local = new LocalSt()

  //Создаем экземпляр класса со сведениями о лечебных учреждениях
  new Medic({
    idMedic: 'medicId',
    storage: local,
  })
})
