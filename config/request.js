import {
  Service
} from "./service"

export function login(formData) {
  return Service({
    url: '/api/admin/login',
    params: formData,
    method: 'post'
  })
}

export function getUserList() {
  return Service({
    url: '/api/audit/stafflist',
    params: {},
    method: 'get'
  })
}

export function getCustomerList() {
  return Service({
    url: '/api/audit/cuslist',
    params: {},
    method: 'get'
  })
}

export function getEmployeeCheckList() {
  return Service({
    url: '/api/audit/reglist',
    params: {},
    method: 'get'
  })
}

export function getEduList() {
  return Service({
    url: '/api/audit/quolist',
    params: {},
    method: 'get'
  })
}

export function updateEdu(id, edu) {
  return Service({
    url: '/api/audit/upqup/' + id,
    params: {
      quota: edu,
      status: 1
    },
    method: 'post'
  })
}

export function checkEmployee(id,status) {
  return Service({
    url: '/api/audit/verify',
    params: {
      staff_id: id,
      status: status
    },
    method: 'post'
  })
}

export function resign(id) {
  return Service({
    url: '/api/audit/resign/' + id,
    params: {},
    method: 'post'
  })
}

export function getRedistribute() {
  return Service({
    url: '/api/audit/reslist',
    params: {},
    method: 'get'
  })
}

export function redistribute(cidArr, eid) {
  return Service({
    url: '/api/audit/batchdis',
    params: {
      customer_arr: cidArr,
      staff_id: eid
    },
    method: 'post'
  })
}

export function getCount() {
  return Service({
    url: '/api/audit/getqua',
    params: {},
    method: 'get'
  })
}

export function searchCum(name) {
  return Service({
    url: '/api/audit/selcus?name=' + name,
    params: {},
    method: 'get'
  })
}

export function searchStaff(name) {
  return Service({
    url: '/api/audit/selstaff?name=' + name,
    params: {},
    method: 'get'
  })
}

export function searchEdu(name) {
  return Service({
    url: '/api/audit/selbycom?company_name=' + name,
    params: {},
    method: 'get'
  })
}

export function deleteEdu(id) {
  return Service({
    url: '/api/audit/delqup/'+id,
    params: {},
    method: 'post'
  })
}

export function register(form) {
  return Service({
    url: '/api/admin/register',
    params: form,
    method: 'post'
  })
}