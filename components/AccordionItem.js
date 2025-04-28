import { styled } from 'stitches.config'

const AccordionItem = ({ index, isActive, onClick, title, content }) => {
  return (
    <details open={index === isActive}>
      <Title onClick={onClick}>
        <Info>i</Info>
        <span>{title}</span>
      </Title>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </details>
  )
}

export default AccordionItem

const Title = styled('summary', {
  fontSize: '$h1',
  color: '$gray',
  display: 'flex',
  flex: '1',
  flex: '1.2rem',
  gap: '0.5rem',
  padding: '0.25rem 0',
  '&::-webkit-details-marker': {
    display: 'none',
  },
  '&:hover': {
    cursor: 'pointer',
    color: '$primary',
    div: {
      backgroundColor: '$primary',
      borderColor: '$primary',
      color: 'white',
    },
  },
  '[open] &': {
    color: '$primary',
  },
})

const Info = styled('div', {
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 auto',
  border: '2px solid $gray',
  color: 'gray',
  width: '1.2rem',
  height: '1.2rem',
  borderRadius: '50%',
  '[open] &': {
    backgroundColor: '$primary',
    borderColor: '$primary',
    color: 'white',
  },
})

const Content = styled('div', {
  color: '$gray',
  padding: '0.5rem 0 $2',
  '[open] &': {
    color: '$primary',
  },
})
