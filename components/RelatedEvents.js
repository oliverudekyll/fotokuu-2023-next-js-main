import Link from 'next/link'
import { styled } from 'stitches.config'
import { getStringTranslation } from 'utils/getStringTranslation'
import EventDate from './EventDate'
import SubHeading from './SubHeading'

const RelatedEvents = ({ events }) => {
  return (
    <Container>
      <h2>{getStringTranslation('relatedEvents')}</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Event>
              <Link href={`/programm/[slug]`} as={`/programm/${event.slug}`}>
                <EventDate
                  startingDateTime={event.programmeFields?.startingDatetime}
                  endingDateTime={event.programmeFields?.endingDatetime}
                />

                {event.programmeFields?.subheading && (
                  <SubHeading>{event.programmeFields.subheading}</SubHeading>
                )}
                <h3>{event.title}</h3>
                {event.programmeFields?.locationName && (
                  <p>{event.programmeFields.locationName}</p>
                )}
              </Link>
            </Event>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default RelatedEvents

const Container = styled('main', {
  ul: {
    listStyle: 'none',
    margin: 0,
  },
  'div p': {
    fontSize: '$p',
  },
})

const Event = styled('div', {
  a: {
    textDecoration: 'none',
  },
  h3: {
    fontStyle: 'italic',
  },
  p: {
    marginTop: '$1',
  },
  '@xlarge': {
    textAlign: 'right',
  },
})
