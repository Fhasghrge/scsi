import React, { Component } from 'react'
import { connect } from 'react-redux'

export const selfinfo = () => {
  return (
    <div>
      用户信息表
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(selfinfo)
