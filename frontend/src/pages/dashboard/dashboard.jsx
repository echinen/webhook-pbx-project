import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getCount } from './dashboardActions'
import ContentHeader from '../../common/template/contentHeader'
import Content from '../../common/template/content'
import ValueBox from '../../common/widget/valueBox'
import Row from '../../common/layout/row'

class Dashboard extends Component {
    
    componentWillMount() {
        this.props.getCount()
    }

    render() {
        const { userCount, activeCallsCount, eventCall } = this.props.count
        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row>
                        <ValueBox cols='12 4' color='green' icon='users'
                            value={userCount || 0} text='Total de usuários cadastrados' />
                        <ValueBox cols='12 4' color='red' icon='phone'
                            value={activeCallsCount || 0} text='Total de chamadas em andamento' />
                        <ValueBox cols='12 4' color='blue' icon='clock'
                            value={eventCall.new || 0} text='Total de chamadas com status "call.new"' />
                        <ValueBox cols='12 4' color='blue' icon='clock'
                            value={eventCall.standby || 0} text='Total de chamadas com status "call.standby"' />
                        <ValueBox cols='12 4' color='blue' icon='clock'
                            value={eventCall.waiting || 0} text='Total de chamadas com status "call.waiting"' />
                        <ValueBox cols='12 4' color='blue' icon='clock'
                            value={eventCall.entered || 0} text='Total de chamadas com status "actor.entered"' />
                        <ValueBox cols='12 4' color='blue' icon='clock'
                            value={eventCall.ongoing || 0} text='Total de chamadas com status "call.ongoing"' />
                        <ValueBox cols='12 4' color='blue' icon='clock'
                            value={eventCall.left || 0} text='Total de chamadas com status "actor.left"' />
                        <ValueBox cols='12 4' color='blue' icon='clock'
                            value={eventCall.finished || 0} text='Total de chamadas com status "call.finished"' />
                    </Row>
                </Content>
            </div>
        )
    }

}

const mapStateToProps = state => ({ count: state.dashboard.count })
const mapDispatchToProps = dispatch => bindActionCreators({ getCount }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)