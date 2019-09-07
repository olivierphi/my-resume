require_relative 'base_view'

module Rougemine
    module View
        class MeView < BaseView
            set_html_template_name "me"

            def bio
                require_relative 'me/bio_view'
                Me::BioView.new.get_html
            end

            def open_source
                require_relative 'me/open_source_view'
                Me::OpenSourceView.new.get_html
            end

            def education
                require_relative 'me/education_view'
                Me::EducationView.new.get_html
            end

            def languages
                require_relative 'me/languages_view'
                Me::LanguagesView.new.get_html
            end

            def hobbies
                require_relative 'me/hobbies_view'
                Me::HobbiesView.new.get_html
            end

            def teaching
                require_relative 'me/teaching_view'
                Me::TeachingView.new.get_html
            end
        end
    end
end
