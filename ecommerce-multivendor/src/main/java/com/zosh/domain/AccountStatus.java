package com.zosh.domain;

public enum AccountStatus {
  PENDING_VERIFICATION, // Account is created but not yet verified
  ACTIVE,               // Account is verified and in good standing
  SUSPENDED,            // Account is temporarily suspended, possibly due to violations
  DEACTIVATED,          // Account is deactivated, user may have to reactivate it
  BANNED,               // Account is permanently banned due to server violations
  CLOSED                // Account is permanently closed, possibly at user request
}
