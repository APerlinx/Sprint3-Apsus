import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const MAIL_KEY = 'mailDB'

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


function getEmptyMail(subject = '', body = '', from = 'momo@momo.com', to = '') {
    return { id: '', subject, body, isRead: false, sentAt: _formatDate(), removedAt: '', from, to, status:'inbox', starred: false}
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail("Important: Your Account Security Update", 'Would love to catch up sometimes', 'john.doe@gmail.com', 'user@appsus.com'))
        mails.push(_createMail('ישראכרט', 'Would love to catch up sometimes', 'sarahsmith@yahoo.com', 'user@appsus.com'))
        mails.push(_createMail("Congratulations on Your New Job!", 'Would love to catch up sometimes', 'david.wilson@hotmail.com', 'user@appsus.com'))
        mails.push(_createMail('Google Storage', 'Would love to catch up sometimes', 'emily.johnson@outlook.com', 'user@appsus.com'))
        mails.push(_createMail('Ted Talks', 'Ted Talks - come listen to the best', 'michael.brown@aol.com', 'user@appsus.com'))
        mails.push(_createMail('עדכון פרטים אישיים', 'Would love to catch up sometimes', 'jennifer.thomas@gmail.com', 'user@appsus.com'))
        mails.push(_createMail('בנק הפועלים', 'Would love to catch up sometimes', 'matthew.miller@yahoo.com', 'user@appsus.com'))
        mails.push(_createMail('תשלום כביש 6', 'Would love to catch up sometimes', 'olivia.anderson@outlook.com', 'user@appsus.com'))
        mails.push(_createMail("Invitation to our Exclusive Event", 'Would love to catch up sometimes', 'william.taylor@gmail.com', 'user@appsus.com'))
        mails.push(_createMail("URGENT: Payment Due Reminder", 'Would love to catch up sometimes', 'sophia.wilson@yahoo.com', 'user@appsus.com'))
        mails.push(_createMail('רישום ללימודים', 'Would love to catch up sometimes', 'momo@momo.com', 'user@appsus.com'))
        mails.push(_createMail('חשוב: עדכון אבטחת החשבון שלך', 'Would love to catch up sometimes', 'james.jackson@hotmail.com', 'user@appsus.com'))
        mails.push(_createMail("Request for Collaboration" , 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 'hwu@add.com', 'user@appsus.com'))
        mails.push(_createMail('GitHub', 'Would love to catch up sometimes', 'ava.thompson@gmail.com', 'user@appsus.com'))
        mails.push(_createMail('Miss you!', 'Would love to catch up sometimes', 'benjamin.davis@yahoo.com', 'user@appsus.com'))
        mails.push(_createMail('תזכורת:פגישה בקרוב', 'Would love to catch up sometimes', 'mia.hernandez@outlook.com', 'user@appsus.com'))
        mails.push(_createMail('Youre storage is running out', 'Would love to catch up sometimes', 'ethan.martinez@gmail.com', 'user@appsus.com'))
        mails.push(_createMail('הצטרף לתכנית הזיכויים שלנו', 'Would love to catch up sometimes', 'emma.anderson@yahoo.com', 'user@appsus.com'))
        mails.push(_createMail("Join Our Rewards Program Today!", 'Would love to catch up sometimes', 'alexander.white@hotmail.com', 'user@appsus.com'))
        mails.push(_createMail("Special Offer: Limited-Time Discount", 'Would love to catch up sometimes', 'abigail.johnson@gmail.com', 'user@appsus.com'))
        mails.push(_createMail("Reminder: Upcoming Meeting", 'what are you doing', 'daniel.martin@yahoo.com', 'user@appsus.com'))
        mails.push(_createMail("Updates on Your Order #12345", 'whats the weather?', 'charlotte.clark@hotmail.com', 'user@appsus.com'))
        mails.push(_createMail('Dear Mrs. Smith', 'whats the time?', 'momo@momo.com', 'user@appsus.com'))
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
