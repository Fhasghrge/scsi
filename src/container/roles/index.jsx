import React, { Component } from 'react'
import { connect } from 'react-redux'

export const selfinfo = () => {
  return (
    <div>
      角色信息
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(selfinfo)
