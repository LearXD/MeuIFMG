import Api from './axios';

export const login = (registration: string, password: string) => {
  return Api.post('/login', { registration, password })
}

export const profile = (token: string) => {
  return Api.get('/profile', { headers: { token } })
}

export const subjects = (token: string) => {
  return Api.get('/subjects', { headers: { token } })
}

export const listGrades = async (token: string) => {

  const subjectList = await subjects(token);

  const result = subjectList.data.map(
    async (subject: any, i: number) => {

      const response = await Api.get('/assessments', {
        headers: { token },
        params: {
          id: subject.id
        }
      })

      let subjectName: string[] = (subject.name as string).split('-');
      subjectName.shift();

      return {
        subject: subjectName.join(' '),
        data: response.data
      }
    })

  return Promise.all(result)
}