require_relative 'base_view'

module Rougemine
    class CvView < BaseView
        set_html_template_name "cv"

        def me
            require_relative 'me_view'
            MeView.new.get_html
        end
    end
end
