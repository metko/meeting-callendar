

const queryEvents = `query getEvents($from: timestamptz!, $to: timestamptz!) {
    calendar_events(where: {_or: [
      {_and: [{date: {_gte: $from}}, {date: {_lt: $to}}]},
      {_and: [{date: {_gt: $from}}, {date: {_lte: $to}}]},
    ]}) {
      id
      date
      Events {
        description
        end
        id
        id_calendar_event
        title
        start
      }
    }
  }`;

const query = async (context) => {
  const request = await fetch('https://back.myffme.fr/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-hasura-admin-secret": "ffme2020*"
    },
    body: JSON.stringify(context)
  })
  const data = await request.json()
  //await sleep(1000)
  return data
}


const getEvents = async (start, end) => {
    return await query({
      query: queryEvents,
      variables: { 
          from: start,
          to: end
       },
    })
}

const bookEvents = async (date, start, end) => {

    console.log(date)
    console.log(start)
    console.log(end)
}


export {getEvents, bookEvents}