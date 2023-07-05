import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mailDB'

// var gFilterBy = { txt: '', minSpeed: 0 }
// var gSortBy = { vendor: 1 }
var gPageIdx

_createMails()

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

function getEmptyMail(subject = 'No subject', body = 'Empty Message', from = 'momo@momo.com', to = 'user@appsus.com') {
    return { id: '', subject, body, isRead:false, sentAt:Date.now(), removedAt:'', from, to }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Miss you!', 'Would love to catch up sometimes', 'momo@momo.com', 'user@appsus.com' ))
        mails.push(_createMail('hi!', 'what are you doing', 'bla@bla.com', 'user@appsus.com' ))
        mails.push(_createMail('dear john', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'hwu@add.com', 'user@appsus.com' ))
        mails.push(_createMail('hello', 'whats the weather?', 'asd@ttg.com', 'user@appsus.com' ))
        mails.push(_createMail('Dear Mrs. Smith', 'whats the time?', 'momo@momo.com', 'sas@fd.com' ))
        utilService.saveToStorage(MAIL_KEY, mails)
    }
    
}

function _createMail(subject, body, from, to) {
    const mail = getEmptyMail(subject, body, from, to)
    mail.id = utilService.makeId()
    return mail
}
