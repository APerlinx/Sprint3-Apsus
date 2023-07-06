import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mailDB'

// var gFilterBy = { txt: '', minSpeed: 0 }
// var gSortBy = { vendor: 1 }
var gPageIdx

_createMails()


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

// const criteria = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: true, // (optional property, if missing: show all)
//     isStared: true, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
//    }
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
    return storageService.query(MAIL_KEY)

}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
            mail.nextMailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
            mail.prevMailId = mails[mailIdx - 1]
                ? mails[mailIdx - 1].id
                : mails[mails.length - 1].id
            return mail
        })
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}


function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY).then(mails => {
        var idx = mails.findIndex(mail => mail.id === mailId)
        if (idx === mails.length - 1) idx = -1
        return mails[idx + 1].id
    })
}

// function getCarCountBySpeedMap() {
//     return storageService.query(CAR_KEY).then(cars => {
//         const carCountBySpeedMap = cars.reduce(
//             (map, car) => {
//                 if (car.maxSpeed < 120) map.slow++
//                 else if (car.maxSpeed < 200) map.normal++
//                 else map.fast++
//                 return map
//             },
//             { slow: 0, normal: 0, fast: 0 }
//         )
//         return carCountBySpeedMap
//     })
// }

function getEmptyMail(subject = '', body = '', from = 'momo@momo.com', to = '') {
    return { id: '', subject, body, isRead: false, sentAt: _formatDate(), removedAt: '', from, to, status:'draft'}
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Miss you!', 'Would love to catch up sometimes', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('hi!', 'what are you doing', 'bla@bla.com', 'user@appsus.com'))
        mails.push(_createMail('dear john', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'hwu@add.com', 'user@appsus.com'))
        mails.push(_createMail('hello', 'whats the weather?', 'asd@ttg.com', 'user@appsus.com'))
        mails.push(_createMail('Dear Mrs. Smith', 'whats the time?', 'momo@momo.com', 'sas@fd.com'))
        utilService.saveToStorage(MAIL_KEY, mails)
    }

}

function _createMail(subject, body, from, to) {
    const mail = getEmptyMail(subject, body, from, to)
    mail.id = utilService.makeId()
    return mail
}

function _formatDate() {
    const date = new Date(Date.now())
  
    // Get hours and pad with leading zero if necessary
    const hours = String(date.getHours()).padStart(2, '0')
  
    // Get minutes and pad with leading zero if necessary
    const minutes = String(date.getMinutes()).padStart(2, '0')
  
    // Get day of the month
    const day = date.getDate()
  
    // Get month in word format
    const month = date.toLocaleString('default', { month: 'long' })
  
    // Return the formatted date string
    return `${hours}:${minutes} ${day} ${month}`
  }
