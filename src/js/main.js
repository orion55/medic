$(document).ready(function () {
  let local = new LocalSt()

  new Medic({
    idMedic: 'medicId',
    storage: local,
  })
})
