require_relative 'base_view'

module Rougemine
    class MeView < BaseView
        def initialize
            @html_template = "me"
        end
    end
end
