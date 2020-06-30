class CategoryPolicy < ApplicationPolicy
  class Scope < Scope
    attr_reader :account, :scope
    def initialize(account, scope)
      @account  = account
      @scope = scope
    end

    def resolve
      if @account.try(:admin?) || @account.try(:manager?)
        scope.all
      else
        raise Pundit::NotAuthorizedError, "Sorry, you cannot perform this action" 
      end
    end
  end
end