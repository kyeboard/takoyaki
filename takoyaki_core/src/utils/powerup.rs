use crate::{Cache, State};

pub trait Powerup<T> {
    fn new() -> Self where Self: Sized;
    fn ready(&self, cache: Cache) -> State;
    fn evolve(&self, data: T);
}

