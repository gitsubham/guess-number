import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const InternalRoute = inject('internalRoutingModel')(observer(({
  internalRoutingModel, isValidRedirection = true, redirectToPath, ...properties
}) => {
  return (<Route
    exact
    {...properties}
    render={props => {
      // supports render, children and component properties
      let componentToBeRendered
      // eslint-disable-next-line no-constant-condition
      if (isValidRedirection) {
        const { render: renderMethod, children, componentRef } = properties
        const finalProps = {
          ...props,
          ...(properties || {}),
        }
        if (renderMethod && typeof renderMethod === 'function') {
          componentToBeRendered = renderMethod(finalProps)
        }
        else if (children && typeof children === 'function') {
          componentToBeRendered = children()
        }
        else if (componentRef) {
          const TargetComponent = componentRef
          componentToBeRendered = (<TargetComponent {...finalProps} />)
        }
        else {
          throw new Error('When using internal route, one of component, render or children must be supplied.')
        }
      }
      else {
        componentToBeRendered = (<Redirect to={redirectToPath} />)
      }
      return componentToBeRendered
    }}
  />)
},
))

InternalRoute.propTypes = {
  isValidRedirection: PropTypes.bool.isRequired,
  redirectToPath: PropTypes.string.isRequired,
}

export default InternalRoute
