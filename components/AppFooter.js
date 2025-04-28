import React from 'react'
import { styled } from 'stitches.config'
import { getStringTranslation } from 'utils/getStringTranslation'

const AppFooter = () => {
  return (
    <Container>
      <div>
        <p>{getStringTranslation('art_director')}</p>
        <p>Kulla Laas</p>
      </div>
      <div>
        <p>{getStringTranslation('managing_director')}</p>
        <p>Merilin Talumaa</p>
      </div>
      <div>
        <p>{getStringTranslation('project_manager')}</p>
        <p>Brigit Arop</p>
      </div>
      <div>
        <p>{getStringTranslation('communication')}</p>
        <p>Marion Leetmaa</p>
      </div>
      <div>
        <p>{getStringTranslation('social_media')}</p>
        <p>Lisbeth Mugame</p>
      </div>
      <div>
        <p>{getStringTranslation('communication_int')}</p>
        <p>Alexia Menikou</p>
      </div>
      <div>
        <p>{getStringTranslation('gd')}</p>
        <p>Ranno Ait & Jaan Sarapuu (WWW)</p>
      </div>
      <div>
        <p>{getStringTranslation('archive')}</p>
        <p>
          <a
            href="https://2021.fotokuu.ee"
            target="_blank"
            rel="noopener noreferrer">
            2021
          </a>
        </p>
        <p>
          <a
            href="https://2019.fotokuu.ee"
            target="_blank"
            rel="noopener noreferrer">
            2019
          </a>
        </p>
        <p>
          <a
            href="https://2017.fotokuu.ee"
            target="_blank"
            rel="noopener noreferrer">
            2017
          </a>
        </p>
        <p>
          <a
            href="https://2015.fotokuu.ee"
            target="_blank"
            rel="noopener noreferrer">
            2015
          </a>
        </p>
        <p>
          <a
            href="https://2013.fotokuu.ee"
            target="_blank"
            rel="noopener noreferrer">
            2013
          </a>
        </p>
        <p>
          <a
            href="https://2011.fotokuu.ee"
            target="_blank"
            rel="noopener noreferrer">
            2011
          </a>
        </p>
      </div>
      <div>
        <p>{getStringTranslation('newsletter')}</p>
        <p>
          <a
            href={getStringTranslation('newsletter_url')}
            target="_blank"
            rel="noopener noreferrer">
            {getStringTranslation('newsletter_join')}
          </a>
        </p>
      </div>
      <div>
        <p>{getStringTranslation('contact')}</p>
        <p>
          <a href="mailto:info@fotokuu.ee">info@fotokuu.ee</a>
        </p>
      </div>
      <div>
        <p>{getStringTranslation('photomonth_in_social_media')}</p>

        <p>
          <a
            href="https://www.facebook.com/Fotokuu/"
            target="_blank"
            rel="noreferrer noopener">
            Facebook
          </a>
        </p>
        <p>
          <a
            href="https://www.instagram.com/tallinn_photomonth"
            target="_blank"
            rel="noreferrer noopener">
            Instagram
          </a>
        </p>
      </div>
    </Container>
  )
}

export default AppFooter

const Container = styled('footer', {
  margin: '$1',
  display: 'grid',
  gap: '$1 $gutter',
  gridTemplateColumns: 'repeat(2, 1fr)',
  'div p:first-child': {
    textTransform: 'uppercase',
  },
  marginTop: '$2',
  '@large': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    margin: '$2',
  },
})
