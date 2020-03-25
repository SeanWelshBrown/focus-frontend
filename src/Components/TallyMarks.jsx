import React from 'react';

const TallyMarks = props => {

  const { tally } = props

  const renderTally = () => {
    switch (tally) {
      case 0:
        return <h3 className="tally"><span className="tally inactive">◌ ◌ ◌ ◌</span></h3>
      case 1:
        return <h3 className="tally">● <span className="tally inactive">◌ ◌ ◌</span></h3>
      case 2:
        return <h3 className="tally">● ● <span className="tally inactive">◌ ◌</span></h3>
      case 3:
        return <h3 className="tally">● ● ● <span className="tally inactive">◌</span></h3>
      case 4:
        return <h3 className="tally">● ● ● ●</h3>
      default:
        return null
    }
  }

  return (
    <div>
      {renderTally()}
    </div>
  )

}

export default TallyMarks;