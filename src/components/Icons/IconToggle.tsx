import { IconContext } from '@utils/context/ThemeSwitchContext';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react'

import { themeOptionType, combineThemeType} from 'types/themes';
const iconVariants = {
  initial: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 }
};
export const IconToggle: React.FC = (props: {}) => {
  let { icons, option, onThemeDispatch, themeState }  = useContext(IconContext) as combineThemeType;



const toggleIcon = () => {
  const themeOption = Object.values(option) as Array<keyof themeOptionType>;
  let currentThemeIdx = themeOption.findIndex(e => e == themeState);
  let nxtTheme = themeOption[(currentThemeIdx + 1) % themeOption.length]


  onThemeDispatch({ type: nxtTheme })
};


return (
  <motion.div
    initial="initial"
    animate="visible"
    variants={iconVariants}

    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    onClick={toggleIcon}
    whileTap={{ scale: 1, rotate: 180 }}
  >
    {icons[themeState]}
  </motion.div>

)


}
