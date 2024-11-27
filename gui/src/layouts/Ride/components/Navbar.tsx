
// Chakra Imports
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  memo,
} from 'react';
import {
  Link,
} from 'react-router-dom';

const Navbar = memo(({
  brandText,
}: {
  brandText: string[];
}) => {
  const variantChange = '0.2s linear';

  const mainText = useColorModeValue('gray.700', 'gray.200');
  const secondaryText = useColorModeValue('gray.400', 'gray.200');

  return (
    <Flex
      as="header"
      px={2}
      transition={variantChange}
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      display="flex"
      minH="50px"
      justifyContent={{
        xl: 'center',
      }}
      alignItems="center"
    >
      <Breadcrumb h="fit-content" separator="/" w="100%">
        {brandText.length > 0 ?
          brandText.map((prop, _, array) => {
            return (
              <BreadcrumbItem
                key={`breadcrumb-${prop}`}
                color={mainText}
                display={{
                  sm:
                    array[array.length - 1] !== prop ?
                      'none' :
                      'inline-block',
                  md: 'inline-block',
                }}
                h="fit-content"
              >
                <BreadcrumbLink
                  as={brandText[brandText.length - 1] !== prop ?
                    Link :
                    Text}
                  h="fit-content"
                  color={secondaryText}
                >
                  {prop}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }) :
          <BreadcrumbItem
            // color={mainText}
            h="fit-content"
            display="inline-block"
          >
            <BreadcrumbLink href="#">
              {brandText}
            </BreadcrumbLink>
          </BreadcrumbItem>
        }
      </Breadcrumb>
    </Flex>
  );
});

export default Navbar;
