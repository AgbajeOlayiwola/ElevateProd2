const lang = (langauge) => {
    if (langauge === 'en') {
        return {
            heroTitle: 'Register and Open a business account in 3 minutes',
            input_location_label: 'Choose your Business Location',
            bvn_input_prompt:
                'Input your BVN and open a Business Account in 3 minutes.',
            business_location_placeholder: 'Select Option',
            business_location_label: 'Do you have an Ecobank Account?',
            proceed_button_title: 'Proceed',
            createAccount: 'Create an Account',
            getOnboard:
                'Get onboard and have access to unlimited possibilities.',
            preferredName: 'Preferred Name',
            emailAddress: 'Email Address',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            agreeTerms: 'I agree with mySME App Terms and Conditions',
            createButton: 'Create Account',
            signInText: 'Already have an account? ',
            signIn: 'Sign In'
        };
    } else if (langauge === 'fr') {
        return {
            heroTitle:
                'Inscrire et Ouvrir un Compte Professionnel en 3 minutes',
            input_location_label:
                "Choisissez l'emplacement de votre entreprise",
            bvn_input_prompt:
                'Saisissez votre BVN et ouvrez un compte professionnel en 3 minutes.',
            business_location_placeholder: 'Sélectionnez une option',
            business_location_label: 'Possédez-vous un compte Ecobank ?',
            proceed_button_title: 'Continuer',
            createAccount: 'Créer un compte',
            getOnboard: 'Embarquez et accédez à des possibilités illimitées.',
            preferredName: 'Nom préféré',
            emailAddress: 'Adresse e-mail',
            password: 'Mot de passe',
            confirmPassword: 'Confirmez le mot de passe',
            agreeTerms: "J'accepte les conditions générales de mySME App",
            createButton: 'Créer un compte',
            signInText: 'Vous avez déjà un compte ? ',
            signIn: 'Se connecter'
        };
    } else if (langauge === 'es') {
        return {
            heroTitle: 'Registrar y Abrir una Cuenta de Negocios en 3 minutos',

            input_location_label: 'Seleccione la ubicación de su empresa',
            bvn_input_prompt:
                'Ingrese su BVN y abra una cuenta comercial en 3 minutos.',
            business_location_placeholder: 'Seleccionar opción',
            business_location_label: '¿Tiene una cuenta en Ecobank?',
            proceed_button_title: 'Continuar',
            createAccount: 'Crear una cuenta',
            getOnboard: 'Únete y accede a posibilidades ilimitadas.',
            preferredName: 'Nombre preferido',
            emailAddress: 'Dirección de correo electrónico',
            password: 'Contraseña',
            confirmPassword: 'Confirmar contraseña',
            agreeTerms: 'Acepto los términos y condiciones de mySME App',
            createButton: 'Crear cuenta',
            signInText: '¿Ya tienes una cuenta? ',
            signIn: 'Iniciar sesión'
        };
    } else if (langauge === 'pt') {
        return {
            heroTitle: 'Registrar e Abrir uma Conta Empresarial em 3 minutos',
            input_location_label: 'Escolha a localização do seu negócio',
            bvn_input_prompt:
                'Insira o seu BVN e abra uma conta comercial em 3 minutos.',
            business_location_placeholder: 'Selecione uma opção',
            business_location_label: 'Você possui uma conta no Ecobank?',
            proceed_button_title: 'Continuar',
            createAccount: 'Criar uma conta',
            getOnboard:
                'Junte-se a nós e tenha acesso a possibilidades ilimitadas.',
            preferredName: 'Nome preferido',
            emailAddress: 'Endereço de e-mail',
            password: 'Senha',
            confirmPassword: 'Confirmar senha',
            agreeTerms: 'Concordo com os termos e condições do mySME App',
            createButton: 'Criar conta',
            signInText: 'Já tem uma conta? ',
            signIn: 'Faça login'
        };
    }
};

export default lang;
