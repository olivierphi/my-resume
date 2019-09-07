require_relative '../base_view'

module Rougemine
    module View
        module Me
            class LanguagesView < BaseView
                set_html_template_name "me/languages"

                def languages
                    data.lang == :en ? [:en, :fr, :es] : [:fr, :en, :es]
                end
            end
        end
    end
end
