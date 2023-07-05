import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mailDB'

// var gFilterBy = { txt: '', minSpeed: 0 }
// var gSortBy = { vendor: 1 }
var gPageIdx

// _createMails()

const email = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId,
    getFilterBy,
    setFilterBy,
    // getCarCountBySpeedMap,
}
window.mailService = mailService

function query() {
    return storageService.query(MAIL_KEY).then(mails => {
        if (gFilterBy.txt) {
            const regex = new RegExp(gFilterBy.txt, 'i')
            mails = mails.filter(mail => regex.test(mail.vendor))
        }
        if (gFilterBy.minSpeed) {
            mails = cars.filter(car => car.maxSpeed >= gFilterBy.minSpeed)
        }
        if (gPageIdx !== undefined) {
            const startIdx = gPageIdx * PAGE_SIZE
            cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
        }
        if (gSortBy.maxSpeed !== undefined) {
            cars.sort(
                (c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed
            )
        } else if (gSortBy.vendor !== undefined) {
            cars.sort(
                (c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor
            )
        }

        return cars
    })

    // const criteria = {
    //     status: 'inbox/sent/trash/draft',
    //     txt: 'puki', // no need to support complex text search
    //     isRead: true, // (optional property, if missing: show all)
    //     isStared: true, // (optional property, if missing: show all)
    //     lables: ['important', 'romantic'] // has any of the labels
    //    }
}

function get(carId) {
    return storageService.get(CAR_KEY, carId)
        .then(car => _setNextPrevCarId(car))
}

function _setNextPrevCarId(car) {
    return storageService.query(CAR_KEY)
        .then(cars => {
            const carIdx = cars.findIndex(currCar => currCar.id === car.id)
            car.nextCarId = cars[carIdx + 1] ? cars[carIdx + 1].id : cars[0].id
            car.prevCarId = cars[carIdx - 1]
                ? cars[carIdx - 1].id
                : cars[cars.length - 1].id
            return car
        })
}

function remove(carId) {
    return storageService.remove(CAR_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getEmptyMail(vendor = '', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextMailId(carId) {
    return storageService.query(CAR_KEY).then(cars => {
        var idx = cars.findIndex(car => car.id === carId)
        if (idx === cars.length - 1) idx = -1
        return cars[idx + 1].id
    })
}

function getCarCountBySpeedMap() {
    return storageService.query(CAR_KEY).then(cars => {
        const carCountBySpeedMap = cars.reduce(
            (map, car) => {
                if (car.maxSpeed < 120) map.slow++
                else if (car.maxSpeed < 200) map.normal++
                else map.fast++
                return map
            },
            { slow: 0, normal: 0, fast: 0 }
        )
        return carCountBySpeedMap
    })
}

function _createCars() {
    let cars = utilService.loadFromStorage(CAR_KEY)
    if (!cars || !cars.length) {
        cars = []
        cars.push(_createCar('audu', 300))
        cars.push(_createCar('fiak', 120))
        cars.push(_createCar('subali', 100))
        cars.push(_createCar('mitsu', 150))
        utilService.saveToStorage(CAR_KEY, cars)
    }
}

function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
}
