class Api::QuotesController < ApplicationController
  def show
    @quote = Quote.find(params[:id]) t
  end
end
