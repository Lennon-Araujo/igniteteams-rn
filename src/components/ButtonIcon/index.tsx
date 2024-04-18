import { TouchableOpacityProps } from "react-native";
import { Container, Icon } from "./styles";
import { ButtonTypeStyleProps } from "../Button/styles";
import { MaterialIcons } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonTypeStyleProps;
}

export function ButtonIcon({ icon, type = "PRIMARY", ...rest}: Props) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}