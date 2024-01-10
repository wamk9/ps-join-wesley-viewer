// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/',
      icon: 'bx:home-circle'
    },
    {
      title: 'Produtos',
      path: '/produto',
      icon: 'mdi:cart'
    },
    {
      title: 'Categoria',
      path: '/categoria-produto',
      icon: 'mdi:invoice-list'
    }
  ]
}

export default navigation
