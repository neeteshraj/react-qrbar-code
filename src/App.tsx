import React from 'react'
import Entry from './pages/Entry'

interface IProps { }

/**
* @author Nitesh Raj Khanal
* @function @App
**/

/**
 * The App component is a functional component that renders the Entry component.
 */
const App: React.FC<IProps> = () => {
  return (
    <Entry />
  )
}

export default App
