from django.urls.converters import StringConverter


class LanguageCodeConverter(StringConverter):
    regex = "en|fr"
