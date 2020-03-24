export default {
  auth: {
    login: {
      email: 'E-mail',
      password: 'Hasło',
      validations: {
        email: 'Wpisz adres e-mail',
        password: 'Wpisz hasło'
      }
    }
  },
  profile: {
    title: 'Home',
    pages: {
      _t_categories: 'Kategorie',
      _t_users: 'Użytkownicy',
      _t_classifieds: 'Ogłoszenia',
      categories: {
        store: {
          name: 'Nazwa',
          icon_class: 'Klasa CSS ikony',
          parent_id: 'Kategoria nadrzędna'
        }
      }
    }
  },
  buttons: {
    submit: 'Wyślij'
  },
  info: {
    no_items: 'Brak danych do wyświetlenia'
  }
}
