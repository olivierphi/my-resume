require_relative 'base_view'

module Rougemine
    class CvView < BaseView
        def initialize
            @html_template = "cv"
        end

        def me
            require_relative 'me_view'
            MeView.new.get_html
        end
    end
end
