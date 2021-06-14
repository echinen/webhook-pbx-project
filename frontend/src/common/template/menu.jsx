import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard' icon='dashboard' />
        <MenuTree label='Cadastro' icon='wpforms'>
            <MenuItem path='user'
                label='Usuários' icon='user' />
            <MenuItem path='call'
                label='Chamadas' icon='phone' />
            <MenuItem path='payment'
                label='Pagamentos' icon='credit-card' />
            <MenuItem path='configuration'
                label='Configurações' icon='cogs' />
        </MenuTree>
    </ul>
)