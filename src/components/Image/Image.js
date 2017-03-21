import React from 'react'
import { first, map } from 'lodash'

import ContentContainer from '../ContentContainer'

class Image extends React.Component {
  static propTypes = {
    path: React.PropTypes.string.isRequired,
    value: React.PropTypes.object
  }

  static defaultProps = {
    value: {}
  }

  static contextTypes = {
    flatpack: React.PropTypes.object
  }

  getUploadPreview () {
    const { uploads } = this.context.flatpack.store.getState().content
    const upload = uploads[this.props.path]

    if (upload) {
      return upload.preview
    }
  }

  getImageProps () {
    const { path, variations } = this.props.value
    const preview = this.getUploadPreview()

    if (preview) {
      return { src: preview }
    }

    if (variations) {
      return {
        src: `${path}/${first(variations).width}`,
        srcSet: map(variations, variation => (
          `${path}/${variation.width} ${variation.width}w`)
        ).join(', ')
      }
    }
  }

  hasImage () {
    return this.props.value || this.getUploadPreview()
  }

  render () {
    const { width, height, thumbnail } = this.props.value

    const style = {
      width: '100%',
      maxWidth: width,
      maxHeight: height,
      ...(!this.hasImage() && {
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: 'cover'
      })
    }

    const imageStyle = {
      width: '100%'
    }

    if (thumbnail) {
      return (
        <div style={style}>
          {this.hasImage() && (
            <img style={imageStyle} {...this.getImageProps()} />
          )}
        </div>
      )
    }

    return null
  }
}

export default ContentContainer(Image)