import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import logo from '../assets/logo.jpg'

const NavbarComponent = ({user, role, logoutUser}) =>  {
  const { isOpen, onToggle } = useDisclosure();
  const navItems = (role === "admin" ? adminNavItems : (role === "user" ? userNavItems : []));

  return (
    <Box style={{position:'sticky', top:'0',zIndex:'999'}} w='100%'>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        justifyContent={'center'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'} alignItems={'center'}>
          
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
          alignItems={'center'}
          >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems={'center'}>
          {/* <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}> */}
            <Image src={logo} w='40px'/>
          {/* </Text> */}

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav navItems={navItems} />
          </Flex>
        </Flex>

        {user == null || user === "" ?
        (
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'/login'}>
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'red.500'}
            href={'/register'}
            _hover={{
              bg: 'red.300',
            }}>
            Sign Up
          </Button>
        </Stack>):(
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'red.500'}
            onClick={() => {logoutUser()}}
            _hover={{
              bg: 'red.300',
            }}>
            
            Sign Out
          </Button>
        </Stack>)}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={navItems} />
      </Collapse>
    </Box>
  )
}

const DesktopNav = ({navItems}) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label} >
          <Popover trigger={'hover'} placement={'bottom-start'}  >
            <PopoverTrigger  >
              <Box
                as="a"
                p={1}
                
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: 'red',
                }}>
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={1}
                rounded={'xl'}
                minW={'sm'}
                zindex={"999"}
                >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      
      _hover={{ bg: useColorModeValue('red.50', 'gray.900') }}>
      <Stack zIndex={"999"} direction={'row'} align={'center'}>
        <Box zIndex={"999"}>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'red.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text zIndex={"999"} fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
          zIndex={"999"}>
          <Icon color={'red.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = ({navItems}) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}



const adminNavItems = [
    {
        label: "Dashboard",
        href: '/admin/dashboard'
    },
    {
        label: "Loan Management",
        children: [
            {
                label: 'Add New Loans',
                href: '/admin/loan/add'
            },
            {
                label: 'View/ Edit Loans',
                href: '/admin/loan/edit'
            }
        ]
    },
    {
        label: "Employee Management",
        children: [
            {
                label: 'Add New Employees',
                href: '/admin/employee/add'
            },
            {
                label: 'View/ Edit EMployees',
                href: '/admin/employee/edit'
            }
        ]
    },
    {
        label: "Item Management",
        children: [
            {
                label: 'Add New Items',
                href: '/admin/item/add'
            },
            {
                label: 'View/ Edit Items',
                href: '/admin/item/edit'
            }
        ]
    },
]

const userNavItems = [
    {
        label: 'Dashboard',
        href: '/'
    },
    {
        label: 'View Applied Loans',
        href: '/loan/all'
    },
    {
        label: 'View Bought Items',
        href: '/items'
    },
    {
        label: 'Apply Loans',
        href: '/loan/apply'
    }
]

export default NavbarComponent;